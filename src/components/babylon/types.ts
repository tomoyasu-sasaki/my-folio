import { Vector3, Color3 } from '@babylonjs/core'
import type { DefineComponent } from 'vue'

declare module '*.vue' {
    const component: DefineComponent<{}, {}, any>
    export default component
}

// カメラの設定
export interface CameraOptions {
    alpha: number
    beta: number
    radius: number
    target: Vector3
}

export interface CameraControls {
    enabled: boolean
    minZ: number
    maxZ: number
}

export interface ViewLimits {
    alpha: { min: number; max: number }
    beta: { min: number; max: number }
    radius: { min: number; max: number }
}

export interface ObstacleAvoidanceOptions {
    enabled: boolean
    checkRadius: number
    strategy: 'preventCollision' | 'smoothAvoidance'
}

export interface CameraState {
    position: Vector3
    target: Vector3
    alpha: number
    beta: number
    radius: number
}

export const DEFAULT_OPTIONS: CameraOptions = {
    alpha: Math.PI / 2,
    beta: Math.PI / 3,
    radius: 10,
    target: new Vector3(0, 0, 0)
}

// ライトの設定
export const LIGHT_CONFIG = {
    hemispheric: {
        direction: new Vector3(0, 1, 0),
        intensity: 0.7
    },
    point: {
        position: new Vector3(0, 5, 0),
        intensity: 0.5
    }
}

// 環境設定
export const ENVIRONMENT_CONFIG = {
    skybox: {
        size: 1000,
        texture: '/textures/skybox.jpg'
    },
    fog: {
        color: new Color3(0.9, 0.9, 0.9),
        density: 0.01
    }
}

// マテリアル関連の型定義
export interface Materials {
    [key: string]: any
}

export interface TextureConfig {
    path: string
    uScale?: number
    vScale?: number
}

export const MATERIALS_CONFIG = {
    ground: {
        diffuseColor: new Color3(0.5, 0.5, 0.5),
        specularColor: new Color3(0.2, 0.2, 0.2)
    },
    wall: {
        diffuseColor: new Color3(0.8, 0.8, 0.8),
        specularColor: new Color3(0.3, 0.3, 0.3)
    }
}

// フロアと壁の設定
export interface FloorConfig {
    width: number
    height: number
    depth: number
}

export interface WallOptions {
    height: number
    thickness: number
}

export const FLOOR_CONFIG: FloorConfig = {
    width: 20,
    height: 0.1,
    depth: 20
}

// モデル関連の型定義
export interface SceneModels {
    [key: string]: any
}

export interface ModelConfig {
    path: string
    position: Vector3
    rotation: Vector3
    scaling: Vector3
}

export interface MMDCharacter {
    modelPath: string
    position: Vector3
    rotation: Vector3
    scale: number
}

export const MODEL_CONFIG = {
    // モデル設定
}

export const MMD_CHARACTERS: MMDCharacter[] = []
export const MMD_SCALE = 0.1

// UI関連の型定義
export interface ElevatorUIComponents {
    panel: any
    buttons: any[]
    display: any
}

export interface FloorInfo {
    floor: number
    name: string
    description: string
}

export const FLOOR_INFO: FloorInfo[] = [
    { floor: 1, name: '1F', description: 'Lobby' },
    { floor: 2, name: '2F', description: 'Gallery' },
    { floor: 3, name: '3F', description: 'Office' }
]

export const UI_SETTINGS = {
    fontSize: 14,
    fontFamily: 'Arial',
    color: 'white',
    background: 'rgba(0, 0, 0, 0.7)'
}

// 掲示板の設定
export interface BoardConfig {
    width: number
    height: number
    position: Vector3
}

export interface CareerItem {
    date: string
    title: string
    description: string
}

export interface SkillItem {
    name: string
    level: number
    category: string
}

export const UI_CONFIG = {
    board: {
        width: 2,
        height: 1.5,
        position: new Vector3(0, 2, 5)
    }
}

export const CAREER_DATA: CareerItem[] = []
export const SKILLS_DATA: SkillItem[] = []

// アニメーション関連の型定義
export interface AnimationConfig {
    position: {
        frames: number[]
        steps: { frame: number; value: Vector3 }[]
    }
    rotation: {
        frames: number[]
        steps: { frame: number; value: Vector3 }[]
    }
}

export interface AnimationState {
    isAnimating: boolean
    currentFloor: number
    targetFloor: number
}

// 階段のトリガー設定
export const STAIR_TRIGGER_CONFIG = {
    size: new Vector3(2, 2, 2),
    position: new Vector3(0, 1, 5)
} 