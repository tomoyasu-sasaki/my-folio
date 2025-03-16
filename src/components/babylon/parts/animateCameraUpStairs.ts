import * as BABYLON from '@babylonjs/core'

export function animateCameraUpStairs(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    nextFloor: number,
    isCameraAnimating: { value: boolean },
    moveToFloor: (floor: number) => void,
    setCameraAnimating: (value: boolean) => void
): void {
    // カメラの位置をアニメーションさせる
    const positionAnimation = new BABYLON.Animation(
        'cameraPositionAnimation',
        'position',
        20,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )

    const positionKeys = []
    const frames = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100]

    const startPosition = new BABYLON.Vector3(3, 1.6, 8)
    const positions = [startPosition.clone()]

    const positionSteps = [
        { deltaX: -1.5, deltaY: 2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -1.2, deltaY: 0.2, deltaZ: 0 },
        { deltaX: -0.5, deltaY: 0.2, deltaZ: 0 },
        { deltaX: 0, deltaY: 0.5, deltaZ: -1 },
        { deltaX: 0, deltaY: 0.5, deltaZ: -1 },
        { deltaX: 0, deltaY: 0.5, deltaZ: -1 },
        { deltaX: 0, deltaY: 0.5, deltaZ: -1 },
        { deltaX: 0, deltaY: 0.5, deltaZ: -1 },
        { deltaX: 0, deltaY: 0, deltaZ: 0 }
    ]

    let currentPosition = startPosition.clone()
    for (let i = 0; i < positionSteps.length; i++) {
        const step = positionSteps[i]
        currentPosition = currentPosition.add(
            new BABYLON.Vector3(step.deltaX, step.deltaY, step.deltaZ)
        )
        positions.push(currentPosition.clone())
    }

    for (let i = 0; i < frames.length; i++) {
        positionKeys.push({ frame: frames[i], value: positions[i] })
    }

    positionAnimation.setKeys(positionKeys)

    // カメラの回転をアニメーションさせる
    const rotationAnimation = new BABYLON.Animation(
        'cameraRotationAnimation',
        'rotation',
        30,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
    )

    const rotationKeys = []
    const rotationFrames = [0, 30, 40, 50, 60, 70, 100]

    const startRotation = new BABYLON.Vector3(
        BABYLON.Tools.ToRadians(-5),
        BABYLON.Tools.ToRadians(-40),
        camera.rotation.z
    )
    const rotations = [startRotation.clone()]

    const rotationSteps = [
        { deltaY: -30 }, // -70度へ
        { deltaY: -20 }, // -90度へ
        { deltaY: -30 }, // -120度へ
        { deltaY: -30 }, // -150度へ
        { deltaY: -30 }, // -180度へ
        { deltaY: 0 } // そのまま
    ]

    let currentRotation = startRotation.clone()
    for (let i = 0; i < rotationSteps.length; i++) {
        const step = rotationSteps[i]
        currentRotation = new BABYLON.Vector3(
            currentRotation.x,
            currentRotation.y + BABYLON.Tools.ToRadians(step.deltaY),
            currentRotation.z
        )
        rotations.push(currentRotation.clone())
    }

    for (let i = 0; i < rotationFrames.length; i++) {
        rotationKeys.push({ frame: rotationFrames[i], value: rotations[i] })
    }

    rotationAnimation.setKeys(rotationKeys)

    camera.animations = [positionAnimation, rotationAnimation]

    camera.detachControl()

    scene.beginAnimation(camera, 0, 100, false, 1, () => {
        isCameraAnimating.value = false
        camera.attachControl(true)
        moveToFloor(nextFloor)
        setCameraAnimating(false)
    })
}
