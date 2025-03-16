// BuildingScene.ts
import * as BABYLON from '@babylonjs/core'
// GLTFやGLBを読み込む場合
import '@babylonjs/loaders'

import { createCamera } from './createCamera'
import { setupLights } from './setupLights'
import { setupEnvironment } from './setupEnvironment'
import { createMaterials } from './createMaterials'
import type { Materials } from './createMaterials'
import { createGroundAndWalls } from './createGroundAndWalls'
import { loadModels } from './loadModels'
import { setupElevatorUI } from './setupElevatorUI'
import { setupFloorUI } from './setupFloorUI'
import { setupStairTrigger } from './setupStairTrigger'
// import { animateCameraUpStairs } from './animateCameraUpStairs'

export class BuildingScene {
    private canvas: HTMLCanvasElement
    private engine: BABYLON.Engine
    private scene!: BABYLON.Scene
    private camera!: BABYLON.UniversalCamera
    private cameraPosition: BABYLON.Vector3
    private cameraRotation: BABYLON.Vector3
    private wallHeight: number = 10
    private isCameraAnimating: boolean = false
    private wallOptions = {
        width: 10,
        height: this.wallHeight,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE
    }
    private models: {
        stairMesh?: BABYLON.AbstractMesh
        elevatorMesh?: BABYLON.AbstractMesh
    } = {}
    private elevatorUIVisible: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true)
        this.cameraPosition = new BABYLON.Vector3(0, 1.6, -8)
        this.cameraRotation = new BABYLON.Vector3(0, 0, 0)

        this.createFloorScene(1)

        // レンダリングループ
        this.engine.runRenderLoop(() => {
            if (this.scene && this.scene.activeCamera) {
                this.scene.render()
            }
        })

        // ウィンドウリサイズ時の処理
        window.addEventListener('resize', () => {
            this.engine.resize()
        })
    }

    private createFloorScene(floor: number): void {
        // シーンの初期化
        if (this.scene) {
            this.scene.dispose()
        }
        this.scene = new BABYLON.Scene(this.engine)

        // カメラの作成
        this.camera = createCamera(
            this.scene,
            this.cameraPosition,
            this.cameraRotation,
            this.canvas
        )

        // シーンのアクティブなカメラを設定
        this.scene.activeCamera = this.camera

        // ライトと環境の設定
        setupLights(this.scene)
        setupEnvironment(this.scene)

        // マテリアルの作成
        const materials: Materials = createMaterials(this.scene)

        // 地面と壁の作成
        createGroundAndWalls(this.scene, materials, floor, this.wallHeight, this.wallOptions)

        // モデルの読み込み
        loadModels(this.scene, floor, this.models)

        // 各階のUI設定
        setupFloorUI(this.scene, floor)

        // エレベーターのUI設定
        setupElevatorUI(this.scene, floor, this.camera, this.models, (nextFloor: number) =>
            this.moveToFloor(nextFloor)
        )

        // 階段のトリガー設定（最上階でない場合）
        if (floor < 5) {
            setupStairTrigger(
                this.scene,
                floor,
                this.camera,
                this.models,
                { value: this.isCameraAnimating },
                (nextFloor: number) => this.moveToFloor(nextFloor),
                (value: boolean) => (this.isCameraAnimating = value)
            )
        }
    }

    private moveToFloor(floor: number): void {
        this.cameraPosition = this.camera.position.clone()
        this.cameraPosition.y = 1.6
        this.cameraRotation = this.camera.rotation.clone()

        // レンダリングループを停止
        this.engine.stopRenderLoop()

        // 現在のシーンを破棄
        this.scene.dispose()

        this.createFloorScene(floor)

        this.engine.runRenderLoop(() => {
            if (this.scene && this.scene.activeCamera) {
                this.scene.render()
            }
        })
    }
}
