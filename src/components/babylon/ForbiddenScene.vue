<template>
    <canvas ref="renderCanvas" class="canvas-size" />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
    Engine,
    Scene,
    Vector3,
    SceneLoader,
    HDRCubeTexture,
    UniversalCamera,
    MeshBuilder,
    StandardMaterial,
    Texture,
    Color3,
    HemisphericLight,
    DirectionalLight
} from '@babylonjs/core'
// GLB形式のモデル表示に使用
import '@babylonjs/loaders/glTF'
// PMX形式のモデル表示に使用
import 'babylon-mmd/esm/Loader/pmxLoader'

const renderCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    if (!renderCanvas.value) return

    // Babylon.js のエンジンとシーンの初期化
    const engine = new Engine(renderCanvas.value, true)
    const scene = new Scene(engine)

    // カメラの設定
    var camera = new UniversalCamera('Camera', new Vector3(0, 1.7, -13), scene)
    camera.attachControl(renderCanvas, true)
    camera.speed = 0.3

    // ライトの設定
    const hemisphericLight = new HemisphericLight(
        'HemisphericLight',
        new Vector3(0, 10, -10),
        scene
    )
    hemisphericLight.intensity = 0.3
    hemisphericLight.specular = new Color3(0, 0, 0)
    hemisphericLight.groundColor = new Color3(1, 1, 1)
    new DirectionalLight('directionalLight', new Vector3(-1, -2, -1), scene)

    // ========================
    // 環境テクスチャとスカイボックスの設定
    // ========================
    var hdrTexture = new HDRCubeTexture('models/textures/environment.hdr', scene, 512)
    scene.environmentTexture = hdrTexture
    scene.environmentIntensity = 3

    // スカイボックスの作成
    var skybox = MeshBuilder.CreateBox('skyBox', { size: 1000 }, scene)
    var skyboxMaterial = new StandardMaterial('skyBoxMaterial', scene)
    skyboxMaterial.backFaceCulling = false
    skyboxMaterial.reflectionTexture = hdrTexture.clone()
    skyboxMaterial.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE
    skyboxMaterial.diffuseColor = new Color3(1, 1, 1)
    skyboxMaterial.specularColor = new Color3(1, 1, 1)
    skybox.material = skyboxMaterial

    // 3Dモデルの読み込み
    SceneLoader.ImportMesh('', '/models/dhiona/', 'dhiona.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(0, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/cure/', 'cure.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(2, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/yoyo/', 'yoyo.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(-2, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/nana/', 'nana.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(4, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/sanae/', 'sanae.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(-4, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/nahida/', 'nahida.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(6, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/dory/', 'dory.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(-6, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    SceneLoader.ImportMesh('', '/models/shiguwin/', 'shiguwin.pmx', scene, (meshes) => {
        meshes.forEach((mesh) => {
            mesh.position = new Vector3(8, 0, 0)
            mesh.scaling = new Vector3(0.5, 0.5, 0.5)
        })
    })
    // レンダリングループ
    engine.runRenderLoop(() => {
        scene.render()
    })

    // リサイズ対応
    const handleResize = () => {
        engine.resize()
    }
    window.addEventListener('resize', handleResize)

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize)
        scene.dispose()
        engine.dispose()
    })
})
</script>

<style scoped>
canvas {
    display: block;
}
.canvas-size {
    width: 100%;
    height: 100%;
}
</style>
