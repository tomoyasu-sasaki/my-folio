import * as BABYLON from '@babylonjs/core'
import { animateCameraUpStairs } from '@/components/babylon/parts/animateCameraUpStairs'

export function setupStairTrigger(
    scene: BABYLON.Scene,
    currentFloor: number,
    camera: BABYLON.UniversalCamera,
    models: { stairMesh?: BABYLON.AbstractMesh },
    isCameraAnimating: { value: boolean },
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    const stairTriggerPosition = new BABYLON.Vector3(3, 1, 9)
    const stairTriggerRange = 2

    scene.registerBeforeRender(() => {
        if (models.stairMesh && !isCameraAnimating.value) {
            const distanceToStairs = BABYLON.Vector3.Distance(camera.position, stairTriggerPosition)
            if (distanceToStairs < stairTriggerRange) {
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
        }
    })
}
