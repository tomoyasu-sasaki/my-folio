import * as BABYLON from '@babylonjs/core'
import { ANIMATION_CONFIG } from '../types/index'
import type { AnimationState } from '../types/index'
/**
 * カメラの階段上昇アニメーションを設定します
 */
export function animateCameraUpStairs(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    nextFloor: number,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    validateComponents(scene, camera)

    const animations = createAnimations(camera)
    applyAnimations(scene, camera, animations, nextFloor, isCameraAnimating, moveToFloor, setCameraAnimating)
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
 * アニメーションを作成します
 */
function createAnimations(camera: BABYLON.UniversalCamera): BABYLON.Animation[] {
    return [
        createPositionAnimation(),
        createRotationAnimation(camera)
    ]
}

/**
 * 位置アニメーションを作成します
 */
function createPositionAnimation(): BABYLON.Animation {
    const animation = new BABYLON.Animation(
        ANIMATION_CONFIG.position.name,
        ANIMATION_CONFIG.position.property,
        ANIMATION_CONFIG.position.frameRate,
        ANIMATION_CONFIG.position.type,
        ANIMATION_CONFIG.position.loopMode
    )

    const keys = createPositionKeys()
    animation.setKeys(keys)
    return animation
}

/**
 * 位置アニメーションのキーフレームを作成します
 */
function createPositionKeys(): { frame: number; value: BABYLON.Vector3 }[] {
    const positions = calculatePositions()
    return ANIMATION_CONFIG.position.frames.map((frame, index) => ({
        frame,
        value: positions[index]
    }))
}

/**
 * アニメーションの位置を計算します
 */
function calculatePositions(): BABYLON.Vector3[] {
    const positions = [ANIMATION_CONFIG.position.startPosition.clone()]
    let currentPosition = ANIMATION_CONFIG.position.startPosition.clone()

    ANIMATION_CONFIG.position.steps.forEach(step => {
        currentPosition = currentPosition.add(
            new BABYLON.Vector3(step.deltaX, step.deltaY, step.deltaZ)
        )
        positions.push(currentPosition.clone())
    })

    return positions
}

/**
 * 回転アニメーションを作成します
 */
function createRotationAnimation(camera: BABYLON.UniversalCamera): BABYLON.Animation {
    const animation = new BABYLON.Animation(
        ANIMATION_CONFIG.rotation.name,
        ANIMATION_CONFIG.rotation.property,
        ANIMATION_CONFIG.rotation.frameRate,
        ANIMATION_CONFIG.rotation.type,
        ANIMATION_CONFIG.rotation.loopMode
    )

    const keys = createRotationKeys(camera)
    animation.setKeys(keys)
    return animation
}

/**
 * 回転アニメーションのキーフレームを作成します
 */
function createRotationKeys(camera: BABYLON.UniversalCamera): { frame: number; value: BABYLON.Vector3 }[] {
    const rotations = calculateRotations(camera)
    return ANIMATION_CONFIG.rotation.frames.map((frame, index) => ({
        frame,
        value: rotations[index]
    }))
}

/**
 * アニメーションの回転を計算します
 */
function calculateRotations(camera: BABYLON.UniversalCamera): BABYLON.Vector3[] {
    const startRotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(ANIMATION_CONFIG.rotation.startRotation.x),
        BABYLON.Tools.ToRadians(ANIMATION_CONFIG.rotation.startRotation.y),
        camera.rotation.z
    )
    const rotations = [startRotation.clone()]
    let currentRotation = startRotation.clone()

    ANIMATION_CONFIG.rotation.steps.forEach(step => {
        currentRotation = new BABYLON.Vector3(
            currentRotation.x,
            currentRotation.y + BABYLON.Tools.ToRadians(step.deltaY),
            currentRotation.z
        )
        rotations.push(currentRotation.clone())
    })

    return rotations
}

/**
 * アニメーションを適用します
 */
function applyAnimations(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    animations: BABYLON.Animation[],
    nextFloor: number,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    camera.animations = animations
    camera.detachControl()

    scene.beginAnimation(camera, 0, 100, false, 1, () => {
        handleAnimationComplete(camera, nextFloor, isCameraAnimating, moveToFloor, setCameraAnimating)
    })
}

/**
 * アニメーション完了時の処理を実行します
 */
function handleAnimationComplete(
    camera: BABYLON.UniversalCamera,
    nextFloor: number,
    isCameraAnimating: AnimationState,
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    isCameraAnimating.value = false
    camera.attachControl(true)
    moveToFloor(nextFloor)
    setCameraAnimating(false)
}
