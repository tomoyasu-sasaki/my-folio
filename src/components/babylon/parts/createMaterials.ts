// createMaterials.ts
import * as BABYLON from '@babylonjs/core'
import type { Materials, TextureConfig } from '../types'
import { MATERIALS_CONFIG } from '../types'
/**
 * シーンのマテリアルを作成します
 * @param scene - Babylonのシーンオブジェクト
 * @returns 作成されたマテリアル群
 */
export function createMaterials(scene: BABYLON.Scene): Materials {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    return {
        groundMaterial: createFloorMaterial(scene),
        wallMaterial: createWallMaterial(scene)
    }
}

/**
 * 床用のマテリアルを作成します
 */
function createFloorMaterial(scene: BABYLON.Scene): BABYLON.StandardMaterial {
    const material = new BABYLON.StandardMaterial('groundMat', scene)
    const texture = createTexture(scene, MATERIALS_CONFIG.floor)
    material.diffuseTexture = texture
    return material
}

/**
 * 壁用のマテリアルを作成します
 */
function createWallMaterial(scene: BABYLON.Scene): BABYLON.StandardMaterial {
    const material = new BABYLON.StandardMaterial('wallMat', scene)
    const texture = createTexture(scene, MATERIALS_CONFIG.wall)
    material.diffuseTexture = texture
    return material
}

/**
 * テクスチャを作成し、スケールを設定します
 */
function createTexture(
    scene: BABYLON.Scene,
    config: TextureConfig
): BABYLON.Texture {
    try {
        const texture = new BABYLON.Texture(config.path, scene)
        texture.uScale = config.uScale
        texture.vScale = config.vScale
        
        // テクスチャ読み込みエラーのハンドリング
        texture.onLoadObservable.add((texture) => {
            if (!texture.isReady()) {
                console.warn(`テクスチャの読み込みに失敗しました: ${config.path}`)
            }
        })

        return texture
    } catch (error) {
        console.error(`テクスチャの作成中にエラーが発生しました: ${config.path}`, error)
        // フォールバックテクスチャを作成（白色）
        const fallbackTexture = new BABYLON.Texture('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', scene)
        return fallbackTexture
    }
}

/**
 * マテリアルのクリーンアップを行います
 */
export function disposeMaterials(materials: Materials): void {
    Object.values(materials).forEach(material => {
        if (material.diffuseTexture) {
            material.diffuseTexture.dispose()
        }
        material.dispose()
    })
}
