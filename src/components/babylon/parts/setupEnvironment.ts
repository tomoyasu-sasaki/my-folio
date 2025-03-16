// setupEnvironment.ts
import * as BABYLON from '@babylonjs/core'

export function setupEnvironment(scene: BABYLON.Scene): void {
    const hdrTexture = new BABYLON.HDRCubeTexture('models/textures/environment.hdr', scene, 512)
    scene.environmentTexture = hdrTexture
    scene.environmentIntensity = 1.5
}
