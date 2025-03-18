import * as BABYLON from '@babylonjs/core'
import type { CameraOptions, CameraControls, ViewLimits, ObstacleAvoidanceOptions, CameraState } from '../types/index'
import { DEFAULT_OPTIONS } from '../types/index'
/**
 * 3D空間内にカメラを作成し、移動制限を設定します
 * @param scene - Babylonのシーンオブジェクト
 * @param position - カメラの初期位置
 * @param rotation - カメラの初期回転
 * @param canvas - カメラをアタッチするHTMLキャンバス要素
 * @param options - カメラの設定オプション
 * @returns 設定済みのUniversalCameraオブジェクト
 */
export function createCamera(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    rotation: BABYLON.Vector3,
    canvas: HTMLCanvasElement,
    options?: CameraOptions
): BABYLON.UniversalCamera {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    if (!canvas) {
        throw new Error('キャンバスが提供されていません')
    }

    // オプションをデフォルト値とマージ
    const config = { ...DEFAULT_OPTIONS, ...options }
    
    // カメラの作成と基本設定
    const camera = new BABYLON.UniversalCamera('Camera', position.clone(), scene)
    setupCameraBasics(camera, rotation, canvas, config)
    setupCameraControls(camera, config.controls)
    setupViewLimits(camera, config.viewLimits)
    
    if (config.obstacleAvoidance) {
        setupObstacleAvoidance(scene, camera, config.obstacleAvoidance)
    }

    // カメラの移動範囲を制限
    setupPositionLimits(camera, config)

    return camera
}

/**
 * カメラの基本設定を行います
 */
function setupCameraBasics(
    camera: BABYLON.UniversalCamera,
    rotation: BABYLON.Vector3,
    canvas: HTMLCanvasElement,
    config: CameraOptions
): void {
    camera.rotation = rotation?.clone() || new BABYLON.Vector3(0, 0, 0)
    camera.attachControl(canvas, true)
    camera.speed = config.speed!
    camera.checkCollisions = config.checkCollisions!
    camera.applyGravity = config.applyGravity!

    if (config.mode === 'tps') {
        setupThirdPersonView(camera)
    }
}

/**
 * カメラの制御設定を行います
 */
function setupCameraControls(
    camera: BABYLON.UniversalCamera,
    controls?: CameraControls
): void {
    if (!controls) return

    if (controls.keysUp) camera.keysUp = controls.keysUp
    if (controls.keysDown) camera.keysDown = controls.keysDown
    if (controls.keysLeft) camera.keysLeft = controls.keysLeft
    if (controls.keysRight) camera.keysRight = controls.keysRight
    
    if (controls.mouseSensitivity) {
        camera.angularSensibility = controls.mouseSensitivity
    }
}

/**
 * カメラの視点制限を設定します
 */
function setupViewLimits(
    camera: BABYLON.UniversalCamera,
    limits?: ViewLimits
): void {
    if (!limits) return

    camera.onAfterCheckInputsObservable.add(() => {
        const rotation = camera.rotation
        if (limits.minBeta !== undefined && limits.maxBeta !== undefined) {
            // rotation.x = Math.max(limits.minBeta, Math.min(limits.maxBeta, rotation.x))
        }
        if (limits.minAlpha !== undefined && limits.maxAlpha !== undefined) {
            // rotation.y = Math.max(limits.minAlpha, Math.min(limits.maxAlpha, rotation.y))
        }
        camera.rotation = rotation
    })
}

/**
 * カメラの位置制限を設定します
 */
function setupPositionLimits(
    camera: BABYLON.UniversalCamera,
    config: CameraOptions
): void {
    camera.onAfterCheckInputsObservable.add(() => {
        const { xLimit, zLimit, minY } = config
        
        if (xLimit) {
            camera.position.x = Math.max(-xLimit, Math.min(xLimit, camera.position.x))
        }
        
        if (minY) {
            camera.position.y = Math.max(minY, camera.position.y)
        }
        
        if (zLimit) {
            camera.position.z = Math.max(-zLimit, Math.min(zLimit, camera.position.z))
        }
    })
}

/**
 * 三人称視点の設定を行います
 */
function setupThirdPersonView(camera: BABYLON.UniversalCamera): void {
    camera.position.y += 2
    camera.rotation.x = Math.PI / 8
    camera.setTarget(new BABYLON.Vector3(0, 1, 0))
}

/**
 * 障害物回避機能を設定します
 */
function setupObstacleAvoidance(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    options: ObstacleAvoidanceOptions
): void {
    const rayLength = options.rayLength || 1
    const layerMask = options.layerMask || 1
    const adjustSpeed = options.adjustSpeed || 0.1

    scene.onBeforeRenderObservable.add(() => {
        const forward = camera.getForwardRay(rayLength)
        const hit = scene.pickWithRay(forward, (mesh) => {
            return mesh.layerMask === layerMask
        })

        if (hit && hit.hit) {
            const distance = hit.distance
            if (distance < rayLength) {
                camera.position.addInPlace(camera.getForwardRay().direction.scale(-adjustSpeed))
            }
        }
    })
}

/**
 * カメラの状態を保存します
 */
export function saveCameraState(camera: BABYLON.UniversalCamera): CameraState {
    return {
        position: camera.position.clone(),
        rotation: camera.rotation.clone(),
        target: camera.target?.clone()
    }
}

/**
 * カメラの状態を復元します
 */
export function restoreCameraState(
    camera: BABYLON.UniversalCamera,
    state: CameraState
): void {
    camera.position = state.position.clone()
    camera.rotation = state.rotation.clone()
    if (state.target) {
        camera.setTarget(state.target.clone())
    }
}

/**
 * カメラのアニメーションを実行します
 */
export function animateCamera(
    camera: BABYLON.UniversalCamera,
    targetPosition: BABYLON.Vector3,
    targetRotation?: BABYLON.Vector3,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    duration: number = 1000
): Promise<void> {
    return new Promise((resolve) => {
        const positionAnimation = new BABYLON.Animation(
            'cameraPosition',
            'position',
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )

        const positionKeys = [
            {
                frame: 0,
                value: camera.position.clone()
            },
            {
                frame: 60,
                value: targetPosition.clone()
            }
        ]

        positionAnimation.setKeys(positionKeys)

        if (targetRotation) {
            const rotationAnimation = new BABYLON.Animation(
                'cameraRotation',
                'rotation',
                60,
                BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
            )

            const rotationKeys = [
                {
                    frame: 0,
                    value: camera.rotation.clone()
                },
                {
                    frame: 60,
                    value: targetRotation.clone()
                }
            ]

            rotationAnimation.setKeys(rotationKeys)
            camera.animations.push(rotationAnimation)
        }

        camera.animations.push(positionAnimation)

        camera.getScene().beginAnimation(camera, 0, 60, false, 1.0, () => {
            resolve()
        })
    })
}
