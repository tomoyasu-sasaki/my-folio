// setupEnvironment.ts
import * as BABYLON from '@babylonjs/core'

interface EnvironmentConfig {
    hdrTexture: {
        path: string
        size: number
    }
    scene: {
        intensity: number
    }
}

const ENVIRONMENT_CONFIG: EnvironmentConfig = {
    hdrTexture: {
        path: 'models/textures/environment.hdr',
        size: 512
    },
    scene: {
        intensity: 1.5
    }
} as const

/**
 * シーンの環境設定を行います
 * @param scene - 設定対象のシーン
 * @throws {Error} シーンが提供されていない場合
 */
export function setupEnvironment(scene: BABYLON.Scene): void {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    try {
        const hdrTexture = createEnvironmentTexture(scene)
        applyEnvironmentSettings(scene, hdrTexture)
    } catch (error) {
        console.error('環境設定の適用中にエラーが発生しました:', error)
        throw error
    }
}

/**
 * 環境テクスチャを作成します
 * @param scene - 対象のシーン
 * @returns 作成されたHDRテクスチャ
 */
function createEnvironmentTexture(scene: BABYLON.Scene): BABYLON.HDRCubeTexture {
    try {
        return new BABYLON.HDRCubeTexture(
            ENVIRONMENT_CONFIG.hdrTexture.path,
            scene,
            ENVIRONMENT_CONFIG.hdrTexture.size
        )
    } catch (error) {
        console.error('環境テクスチャの作成に失敗しました:', error)
        throw error
    }
}

/**
 * 環境設定をシーンに適用します
 * @param scene - 対象のシーン
 * @param texture - 適用するテクスチャ
 */
function applyEnvironmentSettings(
    scene: BABYLON.Scene,
    texture: BABYLON.HDRCubeTexture
): void {
    scene.environmentTexture = texture
    scene.environmentIntensity = ENVIRONMENT_CONFIG.scene.intensity
}
