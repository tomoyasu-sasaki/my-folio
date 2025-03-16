import * as BABYLON from '@babylonjs/core'
import type { Materials } from '@/components/babylon/parts/createMaterials'

interface WallOptions {
    width: number
    height: number
    sideOrientation: number
}

export function createGroundAndWalls(
    scene: BABYLON.Scene,
    materials: Materials,
    floor: number,
    wallHeight: number,
    wallOptions: WallOptions
): void {
    const yOffset = 0

    // 地面の作成
    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 20 }, scene)
    ground.position.y = yOffset
    ground.material = materials.groundMaterial

    // 前の壁
    const wall1 = BABYLON.MeshBuilder.CreatePlane('wall1', wallOptions, scene)
    wall1.position.z = 10
    wall1.position.y = wallHeight / 2 + yOffset
    wall1.rotation.y = Math.PI
    wall1.material = materials.wallMaterial

    // 後ろの壁
    const wall2 = wall1.clone('wall2') as BABYLON.Mesh
    wall2.position.z = -10
    wall2.rotation.y = 0

    // 左の壁
    wallOptions.width = 20
    const wall3 = BABYLON.MeshBuilder.CreatePlane('wall3', wallOptions, scene)
    wall3.position.x = -5
    wall3.position.y = wallHeight / 2 + yOffset
    wall3.rotation.y = Math.PI / 2
    wall3.material = materials.wallMaterial

    // 右の壁
    const wall4 = wall3.clone('wall4') as BABYLON.Mesh
    wall4.position.x = 5
    wall4.rotation.y = -Math.PI / 2

    // 天井と上階の地面の作成
    if (floor < 5) {
        const ceiling1 = BABYLON.MeshBuilder.CreateGround(
            'ceiling1',
            { width: 7.3, height: 20 },
            scene
        )
        ceiling1.position.x = 1.3
        ceiling1.position.y = (wallHeight + yOffset) / 2
        ceiling1.rotation.x = Math.PI
        const ceilingMaterial1 = new BABYLON.StandardMaterial('ceilingMat', scene)
        ceilingMaterial1.diffuseColor = new BABYLON.Color3(1, 1, 1)
        ceiling1.material = ceilingMaterial1

        const ceiling2 = BABYLON.MeshBuilder.CreateGround(
            'ceiling2',
            { width: 2.7, height: 12 },
            scene
        )
        ceiling2.position.x = -3.6
        ceiling2.position.y = (wallHeight + yOffset) / 2
        ceiling2.position.z = -4
        ceiling2.rotation.x = Math.PI
        const ceilingMaterial2 = new BABYLON.StandardMaterial('ceilingMat', scene)
        ceilingMaterial2.diffuseColor = new BABYLON.Color3(1, 1, 1)
        ceiling2.material = ceilingMaterial2

        // 上階に上がったときの地面
        const ground1 = BABYLON.MeshBuilder.CreateGround(
            'ground1',
            { width: 7.3, height: 20 },
            scene
        )
        ground1.position.x = 1.3
        ground1.position.y = wallHeight / 2
        ground1.material = materials.groundMaterial

        const ground2 = BABYLON.MeshBuilder.CreateGround(
            'ground2',
            { width: 2.7, height: 12 },
            scene
        )
        ground2.position.x = -3.6
        ground2.position.y = wallHeight / 2
        ground2.position.z = -4
        ground2.material = materials.groundMaterial
    } else {
        const ceiling = BABYLON.MeshBuilder.CreateGround(
            'ceiling',
            { width: 10, height: 20 },
            scene
        )
        ceiling.position.y = (wallHeight + yOffset) / 2
        ceiling.rotation.x = Math.PI
        const ceilingMaterial = new BABYLON.StandardMaterial('ceilingMat', scene)
        ceilingMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1)
        ceiling.material = ceilingMaterial
    }
}
