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

interface SceneConfig {
    wallHeight: number
    maxFloor: number
    cameraHeight: number
}

interface WallOptions {
    width: number
    height: number
    sideOrientation: number
}

interface SceneModels {
    stairMesh?: BABYLON.AbstractMesh
    elevatorMesh?: BABYLON.AbstractMesh
}

export class BuildingScene {
    private readonly canvas: HTMLCanvasElement
    private readonly engine: BABYLON.Engine
    private readonly config: SceneConfig = {
        wallHeight: 10,
        maxFloor: 5,
        cameraHeight: 1.6
    }
    private readonly wallOptions: WallOptions
    private readonly models: SceneModels = {}

    private scene!: BABYLON.Scene
    private camera!: BABYLON.UniversalCamera
    private cameraPosition: BABYLON.Vector3 = new BABYLON.Vector3()
    private cameraRotation: BABYLON.Vector3 = new BABYLON.Vector3()
    private isCameraAnimating: boolean = false
    private isDisposed: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.engine = new BABYLON.Engine(this.canvas, true, {
            preserveDrawingBuffer: true,
            stencil: true
        })

        this.wallOptions = {
            width: 10,
            height: this.config.wallHeight,
            sideOrientation: BABYLON.Mesh.DOUBLESIDE
        }

        this.initializeScene()
        this.setupEventListeners()
    }

    private initializeScene(): void {
        this.cameraPosition = new BABYLON.Vector3(0, this.config.cameraHeight, -8)
        this.cameraRotation = new BABYLON.Vector3(0, 0, 0)
        this.createFloorScene(1)
        this.startRenderLoop()
    }

    private setupEventListeners(): void {
        window.addEventListener('resize', this.handleResize)
    }

    private handleResize = (): void => {
        if (!this.isDisposed) {
            this.engine.resize()
        }
    }

    private startRenderLoop(): void {
        this.engine.runRenderLoop(() => {
            if (this.scene?.activeCamera && !this.isDisposed) {
                this.scene.render()
            }
        })
    }

    private createFloorScene(floor: number): void {
        this.disposeCurrentScene()
        this.setupNewScene()
        this.setupSceneElements(floor)
        this.setupInteractions(floor)
    }

    private disposeCurrentScene(): void {
        if (this.scene) {
            this.scene.dispose()
        }
    }

    private setupNewScene(): void {
        this.scene = new BABYLON.Scene(this.engine)
        this.camera = createCamera(
            this.scene,
            this.cameraPosition,
            this.cameraRotation,
            this.canvas
        )
        this.scene.activeCamera = this.camera
    }

    private setupSceneElements(floor: number): void {
        setupLights(this.scene)
        setupEnvironment(this.scene)

        const materials: Materials = createMaterials(this.scene)
        createGroundAndWalls(
            this.scene,
            materials,
            floor,
            this.config.wallHeight,
            this.wallOptions
        )

        loadModels(this.scene, floor, this.models)
        setupFloorUI(this.scene, floor)
    }

    private setupInteractions(floor: number): void {
        this.setupElevatorInteraction(floor)
        this.setupStairInteraction(floor)
    }

    private setupElevatorInteraction(floor: number): void {
        setupElevatorUI(
            this.scene,
            floor,
            this.camera,
            this.models,
            this.moveToFloor.bind(this)
        )
    }

    private setupStairInteraction(floor: number): void {
        if (floor < this.config.maxFloor) {
            setupStairTrigger(
                this.scene,
                floor,
                this.camera,
                this.models,
                { value: this.isCameraAnimating },
                this.moveToFloor.bind(this),
                (value: boolean) => (this.isCameraAnimating = value)
            )
        }
    }

    private moveToFloor(floor: number): void {
        this.updateCameraState()
        this.engine.stopRenderLoop()
        this.createFloorScene(floor)
        this.startRenderLoop()
    }

    private updateCameraState(): void {
        this.cameraPosition = this.camera.position.clone()
        this.cameraPosition.y = this.config.cameraHeight
        this.cameraRotation = this.camera.rotation.clone()
    }

    public dispose(): void {
        this.isDisposed = true
        window.removeEventListener('resize', this.handleResize)
        this.scene?.dispose()
        this.engine.dispose()
    }
}
