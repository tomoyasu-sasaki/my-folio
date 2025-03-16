import * as BABYLON from '@babylonjs/core'
import { animateCameraUpStairs } from './animateCameraUpStairs'

interface TriggerConfig {
    position: BABYLON.Vector3
    range: number
}

interface AnimationState {
    value: boolean
}

interface SceneModels {
    stairMesh?: BABYLON.AbstractMesh
}

const STAIR_TRIGGER_CONFIG: TriggerConfig = {
    position: new BABYLON.Vector3(3, 1, 9),
    range: 2
} as const

/**
 * 階段のトリガーをセットアップします
 * @param scene - 設定対象のシーン
 * @param currentFloor - 現在のフロア番号
 * @param camera - カメラオブジェクト
 * @param models - シーン内のモデル群
 * @param isCameraAnimating - カメラアニメーション状態
 * @param moveToFloor - フロア移動関数
 * @param setCameraAnimating - カメラアニメーション状態設定関数
 * @throws {Error} 必要なコンポーネントが提供されていない場合
 */
export function setupStairTrigger(
    scene: BABYLON.Scene,
    currentFloor: number,
    camera: BABYLON.UniversalCamera,
    models: SceneModels,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    validateComponents(scene, camera)
    setupTriggerCheck(scene, currentFloor, camera, models, isCameraAnimating, moveToFloor, setCameraAnimating)
}

/**
 * コンポーネントの妥当性を検証します
 */
function validateComponents(scene: BABYLON.Scene, camera: BABYLON.UniversalCamera): void {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }
    if (!camera) {
        throw new Error('カメラが提供されていません')
    }
}

/**
 * トリガーチェックを設定します
 */
function setupTriggerCheck(
    scene: BABYLON.Scene,
    currentFloor: number,
    camera: BABYLON.UniversalCamera,
    models: SceneModels,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    scene.registerBeforeRender(() => {
        if (!shouldCheckTrigger(models, isCameraAnimating)) return

        if (isInTriggerRange(camera)) {
            handleTriggerActivation(
                scene,
                camera,
                currentFloor,
                isCameraAnimating,
                moveToFloor,
                setCameraAnimating
            )
        }
    })
}

/**
 * トリガーチェックを実行すべきか判定します
 */
function shouldCheckTrigger(models: SceneModels, isCameraAnimating: AnimationState): boolean {
    return !!models.stairMesh && !isCameraAnimating.value
}

/**
 * カメラがトリガー範囲内にいるか判定します
 */
function isInTriggerRange(camera: BABYLON.UniversalCamera): boolean {
    const distanceToStairs = BABYLON.Vector3.Distance(
        camera.position,
        STAIR_TRIGGER_CONFIG.position
    )
    return distanceToStairs < STAIR_TRIGGER_CONFIG.range
}

/**
 * トリガー起動時の処理を実行します
 */
function handleTriggerActivation(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    currentFloor: number,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    isCameraAnimating.value = true
    animateCameraUpStairs(
        scene,
        camera,
        currentFloor + 1,
        isCameraAnimating,
        moveToFloor,
        setCameraAnimating
    )
}
