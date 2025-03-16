import * as BABYLON from '@babylonjs/core'

export function setupLights(scene: BABYLON.Scene): void {
    new BABYLON.HemisphericLight('hemisphericLight', new BABYLON.Vector3(0, 1, 0), scene)
    // ディレクショナルライトを追加
    new BABYLON.DirectionalLight('directionalLight', new BABYLON.Vector3(-1, -2, -1), scene)
}
