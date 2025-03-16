import * as BABYLON from '@babylonjs/core'

export function createCamera(
    scene: BABYLON.Scene,
    position: BABYLON.Vector3,
    rotation: BABYLON.Vector3,
    canvas: HTMLCanvasElement
): BABYLON.UniversalCamera {
    const cam = new BABYLON.UniversalCamera('Camera', position, scene)
    cam.rotation = rotation || new BABYLON.Vector3(0, 0, 0)
    cam.attachControl(canvas, true)
    cam.speed = 0.2

    // カメラの移動範囲を制限
    cam.onAfterCheckInputsObservable.add(() => {
        const xLimit = 3.2
        const zLimit = 8.2
        cam.position.x = Math.max(-xLimit, Math.min(xLimit, cam.position.x))
        cam.position.y = Math.max(1.6, cam.position.y)
        cam.position.z = Math.max(-zLimit, Math.min(zLimit, cam.position.z))
    })

    return cam
}
