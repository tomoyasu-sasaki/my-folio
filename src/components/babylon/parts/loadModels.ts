import * as BABYLON from '@babylonjs/core'
import '@babylonjs/loaders'
// import * as BABYLONMMD from 'babylon-mmd'

export async function loadModels(
    scene: BABYLON.Scene,
    floor: number,
    models: { stairMesh?: BABYLON.AbstractMesh; elevatorMesh?: BABYLON.AbstractMesh }
): Promise<void> {
    const yOffset = 0
    // let mmdMesh = {} as BABYLON.Mesh

    if (floor < 5) {
        try {
            const stairs = await BABYLON.SceneLoader.ImportMeshAsync(
                '',
                '/my-folio/models/',
                'stairs.glb',
                scene
            )
            models.stairMesh = stairs.meshes[0]
            models.stairMesh.position = new BABYLON.Vector3(-2.34, yOffset, 6.25)
            models.stairMesh.rotation = new BABYLON.Vector3(0, 0, 0)
            models.stairMesh.scaling = new BABYLON.Vector3(2, 1.5, 2)
            console.log(`${floor}F階段モデルの読み込みに成功しました！`)
        } catch (error: any) {
            console.log(`${floor}F階段モデルの読み込みに失敗しました！`)
        }
    }

    try {
        const elevter = await BABYLON.SceneLoader.ImportMeshAsync(
            '',
            '/my-folio/models/',
            'elevter.glb',
            scene
        )
        models.elevatorMesh = elevter.meshes[0]
        models.elevatorMesh.position = new BABYLON.Vector3(-4.9, yOffset, -5)
        models.elevatorMesh.rotation = new BABYLON.Vector3(0, 0, 0)
        models.elevatorMesh.scaling = new BABYLON.Vector3(2, 1.5, 1.5)
        console.log(`${floor}Fエレベーターモデルの読み込みに成功しました！`)
    } catch (error: any) {
        console.log(`${floor}Fエレベーターモデルの読み込みに失敗しました！`)
    }

    // switch (floor) {
    //     case 1:
    //         try {
    //             mmdMesh = await BABYLON.SceneLoader.ImportMeshAsync(
    //                 undefined,
    //                 '/models/yoyo/yoyo.pmx',
    //                 undefined,
    //                 scene
    //             ).then((result) => {
    //                 const mesh = result.meshes[0] as BABYLON.Mesh
    //                 mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //                 mesh.position = new BABYLON.Vector3(0, 0, 3)
    //                 return mesh
    //             })
    //         } catch (error) {
    //             console.log('失敗')
    //         }
    //         break
    //     case 2:
    //         try {
    //             mmdMesh = await BABYLON.SceneLoader.ImportMeshAsync(
    //                 undefined,
    //                 '/models/cure/cure.pmx',
    //                 undefined,
    //                 scene
    //             ).then((result) => {
    //                 const mesh = result.meshes[0] as BABYLON.Mesh
    //                 mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //                 mesh.position = new BABYLON.Vector3(0, 0, 3)
    //                 return mesh
    //             })
    //         } catch (error) {
    //             console.log('失敗')
    //         }
    //         break
    //     case 3:
    //         try {
    //             mmdMesh = await BABYLON.SceneLoader.ImportMeshAsync(
    //                 undefined,
    //                 '/models/dhiona/dhiona.pmx',
    //                 undefined,
    //                 scene
    //             ).then((result) => {
    //                 const mesh = result.meshes[0] as BABYLON.Mesh
    //                 mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //                 mesh.position = new BABYLON.Vector3(0, 0, 3)
    //                 return mesh
    //             })
    //         } catch (error) {
    //             console.log('失敗')
    //         }
    //         break
    //     case 4:
    //         try {
    //             mmdMesh = await BABYLON.SceneLoader.ImportMeshAsync(
    //                 undefined,
    //                 '/models/nana/nana.pmx',
    //                 undefined,
    //                 scene
    //             ).then((result) => {
    //                 const mesh = result.meshes[0] as BABYLON.Mesh
    //                 mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //                 mesh.position = new BABYLON.Vector3(0, 0, 3)
    //                 return mesh
    //             })
    //         } catch (error) {
    //             console.log('失敗')
    //         }
    //         break
    //     case 5:
    //     try {
    //         const mmdMesh1 = await BABYLON.SceneLoader.ImportMeshAsync(
    //             undefined,
    //             '/models/yoyo/yoyo.pmx',
    //             undefined,
    //             scene
    //         ).then((result) => {
    //             const mesh = result.meshes[0] as BABYLON.Mesh
    //             mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //             mesh.position = new BABYLON.Vector3(-1, 0, 3)
    //             return mesh
    //         })
    //         const mmdMesh2 = await BABYLON.SceneLoader.ImportMeshAsync(
    //             undefined,
    //             '/models/cure/cure.pmx',
    //             undefined,
    //             scene
    //         ).then((result) => {
    //             const mesh = result.meshes[0] as BABYLON.Mesh
    //             mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //             mesh.position = new BABYLON.Vector3(1, 0, 3)
    //             return mesh
    //         })
    //         const mmdMesh3 = await BABYLON.SceneLoader.ImportMeshAsync(
    //             undefined,
    //             '/models/dhiona/dhiona.pmx',
    //             undefined,
    //             scene
    //         ).then((result) => {
    //             const mesh = result.meshes[0] as BABYLON.Mesh
    //             mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //             mesh.position = new BABYLON.Vector3(0, 0, 5)
    //             return mesh
    //         })
    //         const mmdMesh4 = await BABYLON.SceneLoader.ImportMeshAsync(
    //             undefined,
    //             '/models/nana/nana.pmx',
    //             undefined,
    //             scene
    //         ).then((result) => {
    //             const mesh = result.meshes[0] as BABYLON.Mesh
    //             mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2)
    //             mesh.position = new BABYLON.Vector3(2, 0, 5)
    //             return mesh
    //         })
    //         const vmdLoader = new BABYLONMMD.VmdLoader(scene)
    //         const modelMotion = await vmdLoader.loadAsync(
    //             'model_motion',
    //             '/models/vmd/motion.vmd'
    //         )
    //         const mmdRuntime = new BABYLONMMD.MmdRuntime()
    //         mmdRuntime.register(scene)
    //         const mmdModel1 = mmdRuntime.createMmdModel(mmdMesh1)
    //         mmdModel1.addAnimation(modelMotion)
    //         mmdModel1.setAnimation('model_motion')
    //         const mmdModel2 = mmdRuntime.createMmdModel(mmdMesh2)
    //         mmdModel2.addAnimation(modelMotion)
    //         mmdModel2.setAnimation('model_motion')
    //         const mmdModel3 = mmdRuntime.createMmdModel(mmdMesh3)
    //         mmdModel3.addAnimation(modelMotion)
    //         mmdModel3.setAnimation('model_motion')
    //         const mmdModel4 = mmdRuntime.createMmdModel(mmdMesh4)
    //         mmdModel4.addAnimation(modelMotion)
    //         mmdModel4.setAnimation('model_motion')
    //         mmdRuntime.playAnimation()
    //     } catch (error) {
    //         console.log('失敗')
    //     }
    //     break
    // }
    // const vmdLoader = new BABYLONMMD.VmdLoader(scene)
    // const modelMotion = await vmdLoader.loadAsync('model_motion', '/models/vmd/motion.vmd')

    // const mmdRuntime = new BABYLONMMD.MmdRuntime()
    // mmdRuntime.register(scene)
    // const mmdModel = mmdRuntime.createMmdModel(mmdMesh)
    // mmdModel.addAnimation(modelMotion)
    // mmdModel.setAnimation('model_motion')
    // mmdRuntime.playAnimation()
}
