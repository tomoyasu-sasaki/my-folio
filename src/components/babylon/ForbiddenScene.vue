<template>
  <div class="forbidden-scene">
    <canvas ref="renderCanvas" class="canvas-size" />
    <!-- ローディング表示 -->
    <div v-if="loading" class="loading">ロード中...</div>
    <!-- ゲーム説明 -->
    <div v-if="showInstructions" class="instructions">
      <h2>禁断の神殿からの脱出</h2>
      <p>移動: WASDキー または 矢印キー</p>
      <p>ジャンプ: スペース</p>
      <p>アイテム操作: Eキー</p>
      <p>カメラ回転: マウス</p>
      <button @click="startGame">ゲーム開始</button>
    </div>
    <!-- スコア表示 -->
    <div class="score-display" v-if="isPlaying">宝石: {{ score }} / 5</div>
  </div>
</template>

<script setup>
/**
 * Forbidden Temple Escape Game
 * 
 * 「403 - Forbidden」ページに実装する、最高品質の簡易3Dゲーム。
 * 物理エンジンは使わず、マニュアルで衝突判定・重力をシミュレート。
 * 新規ファイルは一切作成せず、単一ファイルコンポーネントで完結。
 */

import { ref, onMounted, onBeforeUnmount } from "vue";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import * as GUI from "@babylonjs/gui";
import * as Materials from "@babylonjs/materials";

// ---------- Reactive State ----------
const renderCanvas = ref(null);   // <canvas>要素
const loading = ref(true);        // ローディング表示
const showInstructions = ref(true); // ゲーム説明の表示
const isPlaying = ref(false);     // ゲーム開始フラグ
const score = ref(0);            // 宝石の取得数

// ---------- Babylon.js Variables ----------
let engine = null;
let scene = null;
let camera = null;
let player = null;

// 入力管理
const inputMap = {};  
let isJumping = false;
let canJump = true;

// ゲームオブジェクト管理
let gems = [];       // 宝石
let walls = [];      // 衝突判定用の壁・障害物

// 移動・ジャンプ関連定数
const walkSpeed = 0.1;
const jumpForce = 2; // アニメーションベースのジャンプ高さ

/**
 * ゲーム開始処理
 */
const startGame = () => {
  showInstructions.value = false;
  isPlaying.value = true;
  // レイアウト再計算後にリサイズ＆カメラ操作を再アタッチ
  setTimeout(() => {
    engine?.resize();
    camera?.attachControl(renderCanvas.value, true);
  }, 100);
};

/**
 * シーン生成 (Babylon.js初期化)
 */
const createScene = async (canvas) => {
  // エンジンとシーンを作成
  engine = new BABYLON.Engine(canvas, true);
  scene = new BABYLON.Scene(engine);

  // 背景色 & フォグ設定
  scene.clearColor = new BABYLON.Color4(0.02, 0.02, 0.05, 1);
  scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
  scene.fogDensity = 0.01;
  scene.fogColor = new BABYLON.Color3(0.02, 0.02, 0.05);

  // 環境光・メインライト
  scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  const hemiLight = new BABYLON.HemisphericLight(
    "hemiLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  hemiLight.intensity = 0.7;

  const directionalLight = new BABYLON.DirectionalLight(
    "directionalLight",
    new BABYLON.Vector3(-1, -2, -1),
    scene
  );
  directionalLight.intensity = 0.5;

  // 重力（物理エンジンを使わないので手動で扱う）
  scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

  // プレイヤー生成 (Capsule)
  player = BABYLON.MeshBuilder.CreateCapsule(
    "player",
    { height: 1.8, radius: 0.4 },
    scene
  );
  player.position.y = 2;

  // プレイヤーマテリアル
  const playerMaterial = new BABYLON.StandardMaterial("playerMaterial", scene);
  playerMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.4, 0.8);
  playerMaterial.emissiveColor = new BABYLON.Color3(0.1, 0.1, 0.3);
  player.material = playerMaterial;

  // カメラ設定 (FollowCameraでプレイヤーを追従)
  camera = new BABYLON.FollowCamera(
    "camera",
    new BABYLON.Vector3(0, 5, -10),
    scene
  );
  camera.radius = 7;
  camera.heightOffset = 2;
  camera.rotationOffset = 180;
  camera.cameraAcceleration = 0.05;
  camera.maxCameraSpeed = 10;
  camera.lockedTarget = player;
  
  // カメラの上下角度を制限（下方向への視点移動を制限）
  camera.lowerBetaLimit = 0.1; // 下方向の制限
  camera.upperBetaLimit = Math.PI / 3; // 上方向の制限（60度）
  
  camera.attachControl(canvas, true);
  
  // カメラのキーボード制御を無効化（矢印キーをプレイヤー移動専用にする）
  camera.inputs.attached.keyboard.detachControl();

  // 地面
  const ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 50, height: 50 },
    scene
  );
  ground.position.y = 0;

  // 地面マテリアル (Grid)
  const groundMaterial = new Materials.GridMaterial("groundMaterial", scene);
  groundMaterial.mainColor = new BABYLON.Color3(0.2, 0.25, 0.3);
  groundMaterial.lineColor = new BABYLON.Color3(0.4, 0.5, 0.6);
  groundMaterial.gridRatio = 2;
  ground.material = groundMaterial;

  // 外壁・内壁を作成
  createMazeWalls();
  // 宝石配置
  createGems();
  // 障害物を作成
  createObstacles();

  loading.value = false;
  return scene;
};

/**
 * 外壁・内壁の作成
 */
const createMazeWalls = () => {
  // 壁マテリアル
  const wallMaterial = new BABYLON.StandardMaterial("wallMaterial", scene);
  wallMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
  wallMaterial.specularColor = new BABYLON.Color3(0.2, 0.2, 0.2);

  // 外壁
  const outerWalls = [
    { pos: [0, 2, 25], size: [50, 4, 1] },  // 北
    { pos: [0, 2, -25], size: [50, 4, 1] }, // 南
    { pos: [25, 2, 0], size: [1, 4, 50] },  // 東
    { pos: [-25, 2, 0], size: [1, 4, 50] }  // 西
  ];
  outerWalls.forEach((wall) => {
    const box = BABYLON.MeshBuilder.CreateBox(
      "outerWall",
      { width: wall.size[0], height: wall.size[1], depth: wall.size[2] },
      scene
    );
    box.position = new BABYLON.Vector3(...wall.pos);
    box.material = wallMaterial;
    walls.push(box);
  });

  // 内壁 (迷路構成)
  const innerWalls = [
    { pos: [-15, 2, 10], size: [20, 4, 1] },
      { pos: [15, 2, -5], size: [20, 4, 1] },
      { pos: [0, 2, 15], size: [1, 4, 20] },
      { pos: [-10, 2, -10], size: [1, 4, 20] },
      { pos: [10, 2, 5], size: [1, 4, 15] },
      { pos: [-20, 2, -15], size: [10, 4, 1] },
      { pos: [5, 2, -15], size: [15, 4, 1] }
  ];
  innerWalls.forEach((wall, index) => {
    const box = BABYLON.MeshBuilder.CreateBox(
      `innerWall${index}`,
      { width: wall.size[0], height: wall.size[1], depth: wall.size[2] },
      scene
    );
    box.position = new BABYLON.Vector3(...wall.pos);
    box.material = wallMaterial;
    walls.push(box);
  });
};

/**
 * 宝石を配置
 */
const createGems = () => {
  const gemPositions = [
    [-18, 1, -18],
    [18, 1, 18],
    [-18, 1, 18],
    [18, 1, -18],
    [0, 1, -20]
  ];
  gemPositions.forEach((pos, index) => {
    const gem = BABYLON.MeshBuilder.CreatePolyhedron(
      `gem${index}`,
      { type: 1, size: 0.5 },
      scene
    );
    gem.position = new BABYLON.Vector3(...pos);

    // 宝石マテリアル
    const gemMaterial = new BABYLON.StandardMaterial(`gemMaterial${index}`, scene);
    const hue = index / gemPositions.length;
    const color = BABYLON.Color3.FromHSV(hue, 1, 1);
    gemMaterial.diffuseColor = color;
    gemMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
    gemMaterial.emissiveColor = color.scale(0.5);
    gemMaterial.alpha = 0.8;
    gem.material = gemMaterial;

    // 回転アニメーション
    scene.registerBeforeRender(() => {
      gem.rotation.y += 0.01;
      gem.rotation.x += 0.005;
      gem.position.y = pos[1] + Math.sin(performance.now() * 0.001) * 0.1;
    });

    gems.push(gem);
  });
};

/**
 * 障害物を作成
 */
const createObstacles = () => {
  // 振り子 (単純なアニメーション)
  const pendulumBase = BABYLON.MeshBuilder.CreateBox(
    "pendulumBase",
    { width: 1, height: 0.5, depth: 1 },
    scene
  );
  pendulumBase.position = new BABYLON.Vector3(0, 8, 0);

  const movingObstacleMaterial = new BABYLON.StandardMaterial(
    "movingObstacleMaterial",
    scene
  );
  movingObstacleMaterial.diffuseColor = new BABYLON.Color3(0.8, 0.2, 0.2);

  const pendulumBall = BABYLON.MeshBuilder.CreateSphere(
    "pendulumBall",
    { diameter: 2 },
    scene
  );
  pendulumBall.position = new BABYLON.Vector3(0, 4, 0);
  pendulumBall.material = movingObstacleMaterial;

  let pendulumAngle = 0;
  scene.registerBeforeRender(() => {
    pendulumAngle += 0.01;
    const xPos = 5 * Math.sin(pendulumAngle);
    pendulumBall.position = new BABYLON.Vector3(xPos, 4, 0);
  });
  walls.push(pendulumBall);

  // 押せる箱（現状は衝突判定用）
  const boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
  boxMaterial.diffuseColor = new BABYLON.Color3(0.6, 0.4, 0.2);

  const movableBox = BABYLON.MeshBuilder.CreateBox(
    "movableBox",
    { size: 2 },
    scene
  );
  movableBox.position = new BABYLON.Vector3(-5, 1, 5);
  movableBox.material = boxMaterial;
  walls.push(movableBox);
};

/**
 * AABB衝突判定 (BoundingBox同士の比較)
 */
const collides = (mesh1, mesh2) => {
  const box1 = mesh1.getBoundingInfo().boundingBox;
  const box2 = mesh2.getBoundingInfo().boundingBox;
  return !(
    box1.maximumWorld.x < box2.minimumWorld.x ||
    box1.minimumWorld.x > box2.maximumWorld.x ||
    box1.maximumWorld.y < box2.minimumWorld.y ||
    box1.minimumWorld.y > box2.maximumWorld.y ||
    box1.maximumWorld.z < box2.minimumWorld.z ||
    box1.minimumWorld.z > box2.maximumWorld.z
  );
};

/**
 * プレイヤーを新しい座標へ移動し、衝突があれば元に戻す
 */
const attemptMovement = (newPosition) => {
  const oldPosition = player.position.clone();
  player.position = newPosition;

  // 壁・障害物との衝突判定
  for (const wall of walls) {
    if (collides(player, wall)) {
      // 衝突があれば移動無効
      player.position = oldPosition;
      return false;
    }
  }
  return true;
};

/**
 * 宝石をすべて集めたときの勝利画面表示
 */
const showGameWin = () => {
  try {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);

    const panel = new GUI.Rectangle();
    panel.width = "400px";
    panel.height = "200px";
    panel.cornerRadius = 20;
    panel.color = "white";
    panel.thickness = 4;
    panel.background = "rgba(0, 0, 0, 0.7)";
    advancedTexture.addControl(panel);

    const title = new GUI.TextBlock();
    title.text = "おめでとう！";
    title.color = "white";
    title.fontSize = 24;
    title.fontWeight = "bold";
    panel.addControl(title);

    const subTitle = new GUI.TextBlock();
    subTitle.text = "禁断の神殿からの脱出に成功しました！";
    subTitle.color = "white";
    subTitle.fontSize = 18;
    subTitle.top = "40px";
    panel.addControl(subTitle);

    const button = GUI.Button.CreateSimpleButton("restart", "もう一度プレイ");
    button.width = "150px";
    button.height = "40px";
    button.color = "white";
    button.background = "green";
    button.top = "100px";
    button.onPointerClickObservable.add(() => {
      location.reload();
    });
    panel.addControl(button);
  } catch (error) {
    console.error("勝利画面の表示に失敗しました:", error);
    alert("おめでとう！禁断の神殿からの脱出に成功しました！");
  }
};

// ---------- Vue Lifecycle ----------
onMounted(async () => {
  if (!renderCanvas.value) return;

  // シーン生成
  const createdScene = await createScene(renderCanvas.value);

  // キー入力の検知
  createdScene.onKeyboardObservable.add((kbInfo) => {
    switch (kbInfo.type) {
      case BABYLON.KeyboardEventTypes.KEYDOWN:
        inputMap[kbInfo.event.key.toLowerCase()] = true;
        // 矢印キーの別名登録
        if (kbInfo.event.key === "ArrowUp") inputMap["up"] = true;
        if (kbInfo.event.key === "ArrowDown") inputMap["down"] = true;
        if (kbInfo.event.key === "ArrowLeft") inputMap["left"] = true;
        if (kbInfo.event.key === "ArrowRight") inputMap["right"] = true;
        break;
      case BABYLON.KeyboardEventTypes.KEYUP:
        inputMap[kbInfo.event.key.toLowerCase()] = false;
        // 矢印キーの別名登録解除
        if (kbInfo.event.key === "ArrowUp") inputMap["up"] = false;
        if (kbInfo.event.key === "ArrowDown") inputMap["down"] = false;
        if (kbInfo.event.key === "ArrowLeft") inputMap["left"] = false;
        if (kbInfo.event.key === "ArrowRight") inputMap["right"] = false;
        break;
    }
  });

  // レンダリングループ
  engine.runRenderLoop(() => {
    if (isPlaying.value && player) {
      // カメラの前方向
      const cameraDirection = camera.getDirection(new BABYLON.Vector3(0, 0, 1));
      cameraDirection.y = 0;
      cameraDirection.normalize();
      // カメラの右方向（修正：カメラが180度回転しているため方向を反転）
      const right = BABYLON.Vector3.Cross(cameraDirection, BABYLON.Vector3.Up()).negate();

      // 移動ベクトル
      let moveVector = BABYLON.Vector3.Zero();

      // 前後
      if (inputMap["w"] || inputMap["arrowup"] || inputMap["up"]) {
        moveVector.addInPlace(cameraDirection.scale(walkSpeed));
      }
      if (inputMap["s"] || inputMap["arrowdown"] || inputMap["down"]) {
        moveVector.addInPlace(cameraDirection.scale(-walkSpeed));
      }
      // 左右 - 左右の方向を修正
      if (inputMap["a"] || inputMap["arrowleft"] || inputMap["left"]) {
        moveVector.addInPlace(right.scale(-walkSpeed));
      }
      if (inputMap["d"] || inputMap["arrowright"] || inputMap["right"]) {
        moveVector.addInPlace(right.scale(walkSpeed));
      }

      // 水平移動
      if (moveVector.length() > 0) {
        const newPos = player.position.clone();
        newPos.x += moveVector.x;
        newPos.z += moveVector.z;
        attemptMovement(newPos);
      }

      // 簡易的な重力
      if (player.position.y > 1) {
        const newPos = player.position.clone();
        newPos.y -= 0.1;
        if (newPos.y < 1) newPos.y = 1; // 地面を貫通しない
        attemptMovement(newPos);
      }

      // ジャンプ処理
      if ((inputMap[" "] || inputMap["space"]) && player.position.y <= 1.1 && canJump) {
        canJump = false;
        isJumping = true;

        let jumpAngle = 0;
        const jumpInterval = setInterval(() => {
          jumpAngle += 0.2;
          const newY = 1 + Math.sin(jumpAngle) * jumpForce;
          const newPos = player.position.clone();
          newPos.y = newY;
          attemptMovement(newPos);

          // ジャンプ終了
          if (jumpAngle >= Math.PI) {
            clearInterval(jumpInterval);
            player.position.y = 1;
            isJumping = false;
            setTimeout(() => {
              canJump = true;
            }, 500);
          }
        }, 50);
      }

      // 宝石の収集判定
      gems.forEach((gem, index) => {
        if (gem && BABYLON.Vector3.Distance(player.position, gem.position) < 1.5) {
          score.value++;
          gem.dispose();
          gems[index] = null;

          // 効果音再生
          try {
            new BABYLON.Sound(
              "pickupSound",
              "https://assets.babylonjs.com/sound/pickup.wav",
              scene,
              null,
              { autoplay: true, volume: 0.5 }
            );
          } catch (error) {
            console.warn("効果音の再生に失敗:", error);
          }

          // 全部集めたら勝利画面
          if (score.value >= 5) {
            showGameWin();
          }
        }
      });
    }
    // シーン描画
    createdScene.render();
  });

  // ウィンドウリサイズ
  window.addEventListener("resize", () => engine.resize());
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => {});
  if (engine) {
    engine.dispose();
  }
});
</script>

<style scoped>
.canvas-size {
  width: 100%;
  height: 100vh;
  display: block;
  background: #000; /* 背景を黒で統一 */
}

.loading,
.instructions {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
}

.instructions h2 {
  margin-top: 0;
  color: #ff9900;
}

.instructions button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff9900;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}
.instructions button:hover {
  background-color: #ffb844;
}

.score-display {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
}
</style>
  