// createMaterials.ts
import * as BABYLON from '@babylonjs/core'

export interface Materials {
    groundMaterial: BABYLON.StandardMaterial
    wallMaterial: BABYLON.StandardMaterial
}

export function createMaterials(scene: BABYLON.Scene): Materials {
    const floorTexture = new BABYLON.Texture('models/textures/WoodFloor.jpg', scene)
    floorTexture.uScale = 4
    floorTexture.vScale = 4

    const wallTexture = new BABYLON.Texture('models/textures/ConcreteWall.jpg', scene)
    wallTexture.uScale = 2
    wallTexture.vScale = 1

    const groundMaterial = new BABYLON.StandardMaterial('groundMat', scene)
    groundMaterial.diffuseTexture = floorTexture

    const wallMaterial = new BABYLON.StandardMaterial('wallMat', scene)
    wallMaterial.diffuseTexture = wallTexture

    return {
        groundMaterial,
        wallMaterial
    }
}
