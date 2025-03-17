import * as BABYLON from '@babylonjs/core'
import { LIGHT_CONFIG } from '../types'

/**
 * シーンのライティングをセットアップします
 * @param scene - 設定対象のシーン
 * @throws {Error} シーンが提供されていない場合
 */
export function setupLights(scene: BABYLON.Scene): void {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    try {
        createHemisphericLight(scene)
        createDirectionalLight(scene)
    } catch (error) {
        console.error('ライティングの設定中にエラーが発生しました:', error)
        throw error
    }
}

/**
 * 半球光源を作成します
 * 空からの環境光をシミュレートします
 */
function createHemisphericLight(scene: BABYLON.Scene): BABYLON.HemisphericLight {
    return new BABYLON.HemisphericLight(
        LIGHT_CONFIG.hemispheric.name,
        LIGHT_CONFIG.hemispheric.direction,
        scene
    )
}

/**
 * 指向性光源を作成します
 * 太陽光のような直接光をシミュレートします
 */
function createDirectionalLight(scene: BABYLON.Scene): BABYLON.DirectionalLight {
    return new BABYLON.DirectionalLight(
        LIGHT_CONFIG.directional.name,
        LIGHT_CONFIG.directional.direction,
        scene
    )
}
