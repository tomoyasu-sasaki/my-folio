import * as BABYLON from '@babylonjs/core'
import type { Materials } from './createMaterials'

interface WallOptions {
    width: number
    height: number
    sideOrientation: number
}

interface FloorConfig {
    yOffset: number
    groundWidth: number
    groundHeight: number
    upperGroundWidth1: number
    upperGroundHeight1: number
    upperGroundWidth2: number
    upperGroundHeight2: number
}

const FLOOR_CONFIG: FloorConfig = {
    yOffset: 0,
    groundWidth: 10,
    groundHeight: 20,
    upperGroundWidth1: 7.3,
    upperGroundHeight1: 20,
    upperGroundWidth2: 2.7,
    upperGroundHeight2: 12
}

/**
 * 地面と壁を作成します
 */
export function createGroundAndWalls(
    scene: BABYLON.Scene,
    materials: Materials,
    floor: number,
    wallHeight: number,
    wallOptions: WallOptions
): void {
    createGround(scene, materials, FLOOR_CONFIG)
    createWalls(scene, materials, wallHeight, wallOptions, FLOOR_CONFIG)
    createCeilingAndUpperGround(scene, materials, floor, wallHeight, FLOOR_CONFIG)
}

/**
 * 地面を作成します
 */
function createGround(
    scene: BABYLON.Scene,
    materials: Materials,
    config: FloorConfig
): BABYLON.Mesh {
    const ground = BABYLON.MeshBuilder.CreateGround('ground', {
        width: config.groundWidth,
        height: config.groundHeight
    }, scene)
    ground.position.y = config.yOffset
    ground.material = materials.groundMaterial
    return ground
}

/**
 * 壁を作成します
 */
function createWalls(
    scene: BABYLON.Scene,
    materials: Materials,
    wallHeight: number,
    wallOptions: WallOptions,
    config: FloorConfig
): void {
    // 前の壁
    const frontWall = createWall(scene, materials, wallOptions, {
        name: 'wall1',
        position: new BABYLON.Vector3(0, wallHeight / 2 + config.yOffset, 10),
        rotation: new BABYLON.Vector3(0, Math.PI, 0)
    })

    // 後ろの壁
    const backWall = frontWall.clone('wall2')
    backWall.position.z = -10
    backWall.rotation.y = 0

    // 左右の壁用のオプション
    const sideWallOptions = { ...wallOptions, width: 20 }

    // 左の壁
    const leftWall = createWall(scene, materials, sideWallOptions, {
        name: 'wall3',
        position: new BABYLON.Vector3(-5, wallHeight / 2 + config.yOffset, 0),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0)
    })

    // 右の壁
    const rightWall = leftWall.clone('wall4')
    rightWall.position.x = 5
    rightWall.rotation.y = -Math.PI / 2
}

/**
 * 個別の壁を作成します
 */
function createWall(
    scene: BABYLON.Scene,
    materials: Materials,
    options: WallOptions,
    {
        name,
        position,
        rotation
    }: {
        name: string
        position: BABYLON.Vector3
        rotation: BABYLON.Vector3
    }
): BABYLON.Mesh {
    const wall = BABYLON.MeshBuilder.CreatePlane(name, options, scene)
    wall.position = position
    wall.rotation = rotation
    wall.material = materials.wallMaterial
    return wall
}

/**
 * 天井と上階の地面を作成します
 */
function createCeilingAndUpperGround(
    scene: BABYLON.Scene,
    materials: Materials,
    floor: number,
    wallHeight: number,
    config: FloorConfig
): void {
    if (floor < 5) {
        createSplitCeilingAndGround(scene, materials, wallHeight, config)
    } else {
        createFullCeiling(scene, wallHeight, config)
    }
}

/**
 * 分割された天井と地面を作成します（5階未満用）
 */
function createSplitCeilingAndGround(
    scene: BABYLON.Scene,
    materials: Materials,
    wallHeight: number,
    config: FloorConfig
): BABYLON.Mesh[] {
    // 天井パート1
    const ceiling1 = createCeilingPart(scene, {
        name: 'ceiling1',
        width: config.upperGroundWidth1,
        height: config.upperGroundHeight1,
        position: new BABYLON.Vector3(1.3, (wallHeight + config.yOffset) / 2, 0)
    })

    // 天井パート2
    const ceiling2 = createCeilingPart(scene, {
        name: 'ceiling2',
        width: config.upperGroundWidth2,
        height: config.upperGroundHeight2,
        position: new BABYLON.Vector3(-3.6, (wallHeight + config.yOffset) / 2, -4)
    })

    // 上階の地面パート1
    const ground1 = createUpperGroundPart(scene, materials, {
        name: 'ground1',
        width: config.upperGroundWidth1,
        height: config.upperGroundHeight1,
        position: new BABYLON.Vector3(1.3, wallHeight / 2, 0)
    })

    // 上階の地面パート2
    const ground2 = createUpperGroundPart(scene, materials, {
        name: 'ground2',
        width: config.upperGroundWidth2,
        height: config.upperGroundHeight2,
        position: new BABYLON.Vector3(-3.6, wallHeight / 2, -4)
    })

    return [ceiling1, ceiling2, ground1, ground2]
}

/**
 * 天井パーツを作成します
 */
function createCeilingPart(
    scene: BABYLON.Scene,
    {
        name,
        width,
        height,
        position
    }: {
        name: string
        width: number
        height: number
        position: BABYLON.Vector3
    }
): BABYLON.Mesh {
    const ceiling = BABYLON.MeshBuilder.CreateGround(name, { width, height }, scene)
    ceiling.position = position
    ceiling.rotation.x = Math.PI

    const ceilingMaterial = new BABYLON.StandardMaterial(`${name}Mat`, scene)
    ceilingMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
    ceiling.material = ceilingMaterial

    return ceiling
}

/**
 * 上階の地面パーツを作成します
 */
function createUpperGroundPart(
    scene: BABYLON.Scene,
    materials: Materials,
    {
        name,
        width,
        height,
        position
    }: {
        name: string
        width: number
        height: number
        position: BABYLON.Vector3
    }
): BABYLON.Mesh {
    const ground = BABYLON.MeshBuilder.CreateGround(name, { width, height }, scene)
    ground.position = position
    ground.material = materials.groundMaterial
    return ground
}

/**
 * 完全な天井を作成します（5階用）
 */
function createFullCeiling(
    scene: BABYLON.Scene,
    wallHeight: number,
    config: FloorConfig
): BABYLON.Mesh {
    const ceiling = BABYLON.MeshBuilder.CreateGround(
        'ceiling',
        { width: config.groundWidth, height: config.groundHeight },
        scene
    )
    ceiling.position.y = (wallHeight + config.yOffset) / 2
    ceiling.rotation.x = Math.PI

    const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene)
    ceilingMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
    ceiling.material = ceilingMaterial

    return ceiling
}
