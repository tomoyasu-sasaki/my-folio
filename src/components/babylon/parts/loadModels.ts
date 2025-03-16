import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
import * as BABYLONMMD from 'babylon-mmd'

interface ModelConfig {
    path: string
    scale: BABYLON.Vector3
    position: BABYLON.Vector3
    rotation: BABYLON.Vector3
}

interface SceneModels {
    stairMesh?: BABYLON.AbstractMesh
    elevatorMesh?: BABYLON.AbstractMesh
}

interface MMDCharacter {
    name: string
    modelPath: string
    position: BABYLON.Vector3
}

const MODEL_CONFIG = {
    stairs: {
        path: '/models/stairs.glb',
        scale: new BABYLON.Vector3(2, 1.5, 2),
        position: new BABYLON.Vector3(-2.34, 0, 6.25),
        rotation: new BABYLON.Vector3(0, 0, 0)
    },
    elevator: {
        path: '/models/elevter.glb',
        scale: new BABYLON.Vector3(2, 1.5, 1.5),
        position: new BABYLON.Vector3(-4.9, 0, -5),
        rotation: new BABYLON.Vector3(0, 0, 0)
    }
}

const MMD_CHARACTERS: { [key: number]: MMDCharacter } = {
    1: { name: 'yoyo', modelPath: '/models/yoyo/yoyo.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    2: { name: 'cure', modelPath: '/models/cure/cure.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    3: { name: 'dhiona', modelPath: '/models/dhiona/dhiona.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    4: { name: 'nana', modelPath: '/models/nana/nana.pmx', position: new BABYLON.Vector3(0, 0, 3) }
}

const MMD_SCALE = new BABYLON.Vector3(0.2, 0.2, 0.2)

/**
 * モデルを読み込み、シーンに配置します
 */
export async function loadModels(
    scene: BABYLON.Scene,
    floor: number,
    models: SceneModels
): Promise<void> {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    try {
        await Promise.all([
            loadStructuralModels(scene, floor, models),
            loadCharacterModel(scene, floor)
        ])
    } catch (error) {
        console.error('モデルの読み込み中にエラーが発生しました:', error)
    }
}

/**
 * 建物の構造物（階段、エレベーター）を読み込みます
 */
async function loadStructuralModels(
    scene: BABYLON.Scene,
    floor: number,
    models: SceneModels
): Promise<void> {
    if (floor < 5) {
        await loadModel(scene, MODEL_CONFIG.stairs, 'stairs')
            .then(mesh => {
                models.stairMesh = mesh
                console.log(`${floor}F階段モデルの読み込みに成功しました！`)
            })
            .catch(error => {
                console.error(`${floor}F階段モデルの読み込みに失敗しました:`, error)
            })
    }

    await loadModel(scene, MODEL_CONFIG.elevator, 'elevator')
        .then(mesh => {
            models.elevatorMesh = mesh
            console.log(`${floor}Fエレベーターモデルの読み込みに成功しました！`)
        })
        .catch(error => {
            console.error(`${floor}Fエレベーターモデルの読み込みに失敗しました:`, error)
        })
}

/**
 * 個別のモデルを読み込み、配置します
 */
async function loadModel(
    scene: BABYLON.Scene,
    config: ModelConfig,
    name: string
): Promise<BABYLON.AbstractMesh> {
    const result = await BABYLON.SceneLoader.ImportMeshAsync('', '', config.path, scene)
    const mesh = result.meshes[0]
    mesh.scaling = config.scale
    mesh.position = config.position
    mesh.rotation = config.rotation
    return mesh
}

/**
 * MMDキャラクターモデルを読み込み、アニメーションを設定します
 */
async function loadCharacterModel(
    scene: BABYLON.Scene,
    floor: number
): Promise<void> {
    if (floor > 4) return

    const character = MMD_CHARACTERS[floor]
    if (!character) return

    try {
        const mesh = await loadMMDMesh(scene, character)
        await setupMMDAnimation(scene, mesh)
    } catch (error) {
        console.error(`${character.name}の読み込みに失敗しました:`, error)
    }
}

/**
 * MMDメッシュを読み込みます
 */
async function loadMMDMesh(
    scene: BABYLON.Scene,
    character: MMDCharacter
): Promise<BABYLON.Mesh> {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        undefined,
        character.modelPath,
        undefined,
        scene
    )
    
    const mesh = result.meshes[0] as BABYLON.Mesh
    mesh.scaling = MMD_SCALE
    mesh.position = character.position
    return mesh
}

/**
 * MMDアニメーションを設定します
 */
async function setupMMDAnimation(
    scene: BABYLON.Scene,
    mesh: BABYLON.Mesh
): Promise<void> {
    const vmdLoader = new BABYLONMMD.VmdLoader(scene)
    const modelMotion = await vmdLoader.loadAsync(
        'model_motion',
        '/models/vmd/motion.vmd'
    )

    const mmdRuntime = new BABYLONMMD.MmdRuntime()
    mmdRuntime.register(scene)
    
    const mmdModel = mmdRuntime.createMmdModel(mesh)
    mmdModel.addAnimation(modelMotion)
    mmdModel.setAnimation('model_motion')
    mmdRuntime.playAnimation()
}
