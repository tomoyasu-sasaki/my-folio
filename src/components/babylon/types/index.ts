import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'

/** アニメーションの状態を管理するインターフェース */
export interface AnimationState {
    value: boolean
}

/** アニメーションの設定を定義するインターフェース */
export interface AnimationConfig {
    /** 位置アニメーションの設定 */
    position: {
        name: string
        property: string
        frameRate: number
        type: number
        loopMode: number
        frames: number[]
        startPosition: BABYLON.Vector3
        steps: Array<{
            deltaX: number
            deltaY: number
            deltaZ: number
        }>
    }
    /** 回転アニメーションの設定 */
    rotation: {
        name: string
        property: string
        frameRate: number
        type: number
        loopMode: number
        frames: number[]
        startRotation: {
            x: number
            y: number
        }
        steps: Array<{
            deltaY: number
        }>
    }
}

/** シーンの基本設定を定義するインターフェース */
export interface SceneConfig {
    wallHeight: number
    maxFloor: number
    cameraHeight: number
}

/** 壁のオプションを定義するインターフェース */
export interface WallOptions {
    width: number
    height: number
    sideOrientation: number
}

/** シーン内のモデルを管理するインターフェース */
export interface SceneModels {
    stairMesh?: BABYLON.AbstractMesh
    elevatorMesh?: BABYLON.AbstractMesh
}

/** カメラのキーボード・マウス制御設定 */
export interface CameraControls {
    keysUp?: number[]
    keysDown?: number[]
    keysLeft?: number[]
    keysRight?: number[]
    mouseSensitivity?: number
}

/** カメラの視点制限設定 */
export interface ViewLimits {
    minBeta?: number
    maxBeta?: number
    minAlpha?: number
    maxAlpha?: number
}

/** 障害物回避のオプション設定 */
export interface ObstacleAvoidanceOptions {
    rayLength?: number
    layerMask?: number
    adjustSpeed?: number
}

/** カメラの詳細設定オプション */
export interface CameraOptions {
    speed?: number
    minY?: number
    xLimit?: number
    zLimit?: number
    checkCollisions?: boolean
    applyGravity?: boolean
    controls?: CameraControls
    viewLimits?: ViewLimits
    obstacleAvoidance?: ObstacleAvoidanceOptions
    mode?: 'fps' | 'tps'
}

/** カメラの状態を管理するインターフェース */
export interface CameraState {
    position: BABYLON.Vector3
    rotation: BABYLON.Vector3
    target?: BABYLON.Vector3
}

/** デフォルトのカメラオプション設定 */
export const DEFAULT_OPTIONS: CameraOptions = {
    speed: 0.2,
    minY: 1.6,
    xLimit: 3.2,
    zLimit: 8.2,
    checkCollisions: false,
    applyGravity: false,
    controls: {
        mouseSensitivity: 2000.0
    },
    viewLimits: {
        minBeta: 0.1,
        maxBeta: Math.PI / 2,
        minAlpha: -Math.PI,
        maxAlpha: Math.PI
    },
    mode: 'fps'
}

/** フロアの設定を定義するインターフェース */
export interface FloorConfig {
    yOffset: number
    groundWidth: number
    groundHeight: number
    upperGroundWidth1: number
    upperGroundHeight1: number
    upperGroundWidth2: number
    upperGroundHeight2: number
}

/** デフォルトのフロア設定 */
export const FLOOR_CONFIG: FloorConfig = {
    yOffset: 0,
    groundWidth: 10,
    groundHeight: 20,
    upperGroundWidth1: 7.3,
    upperGroundHeight1: 20,
    upperGroundWidth2: 2.7,
    upperGroundHeight2: 12
}

/** マテリアル管理インターフェース */
export interface Materials {
    groundMaterial: BABYLON.StandardMaterial
    wallMaterial: BABYLON.StandardMaterial
}

/** テクスチャ設定インターフェース */
export interface TextureConfig {
    path: string
    uScale: number
    vScale: number
}

/** マテリアル設定インターフェース */
export interface MaterialsConfig {
    floor: TextureConfig
    wall: TextureConfig
}

/** デフォルトのマテリアル設定 */
export const MATERIALS_CONFIG: MaterialsConfig = {
    floor: {
        path: 'models/textures/WoodFloor.jpg',
        uScale: 4,
        vScale: 4
    },
    wall: {
        path: 'models/textures/ConcreteWall.jpg',
        uScale: 2,
        vScale: 1
    }
}

/** 3Dモデルの設定インターフェース */
export interface ModelConfig {
    path: string
    scale: BABYLON.Vector3
    position: BABYLON.Vector3
    rotation: BABYLON.Vector3
}

/** MMDキャラクター設定インターフェース */
export interface MMDCharacter {
    name: string
    modelPath: string
    position: BABYLON.Vector3
}

/** 3Dモデルのデフォルト設定 */
export const MODEL_CONFIG = {
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

/** MMDキャラクターのデフォルト設定 */
export const MMD_CHARACTERS: { [key: number]: MMDCharacter } = {
    // 1: { name: 'yoyo', modelPath: '/models/yoyo/yoyo.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    // 2: { name: 'cure', modelPath: '/models/cure/cure.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    // 3: { name: 'dhiona', modelPath: '/models/dhiona/dhiona.pmx', position: new BABYLON.Vector3(0, 0, 3) },
    // 4: { name: 'nana', modelPath: '/models/nana/nana.pmx', position: new BABYLON.Vector3(0, 0, 3) }
}

/** MMDモデルのスケール設定 */
export const MMD_SCALE = new BABYLON.Vector3(0.2, 0.2, 0.2)

/** フロア情報インターフェース */
export interface FloorInfo {
    floor: number
    section: string
}

/** エレベーターUIコンポーネントインターフェース */
export interface ElevatorUIComponents {
    panel: GUI.StackPanel
    label: GUI.TextBlock
    buttons: GUI.Button[]
}

/** フロア情報の定義 */
export const FLOOR_INFO: FloorInfo[] = [
    { floor: 1, section: '1階（ロビー）' },
    { floor: 2, section: '2階（自己紹介）' },
    { floor: 3, section: '3階（プロジェクト）' },
    { floor: 4, section: '4階（スキルセット）' },
    { floor: 5, section: '5階（連絡先）' }
]

/** UIの設定定義 */
export const UI_SETTINGS = {
    panel: {
        width: '220px'
    },
    label: {
        height: '40px',
        color: 'white',
        fontSize: 24,
        text: '何階へ行きますか？'
    },
    button: {
        width: '400px',
        height: '50px',
        color: 'white',
        fontSize: 24,
        background: 'gray'
    },
    interaction: {
        elevatorDistance: 3
    }
} as const

/** 環境設定インターフェース */
export interface EnvironmentConfig {
    hdrTexture: {
        path: string
        size: number
    }
    scene: {
        intensity: number
    }
}

/** 環境設定のデフォルト値 */
export const ENVIRONMENT_CONFIG: EnvironmentConfig = {
    hdrTexture: {
        path: 'models/textures/environment.hdr',
        size: 512
    },
    scene: {
        intensity: 1.5
    }
} as const

/** ボード設定インターフェース */
export interface BoardConfig {
    width: number
    height: number
    position: BABYLON.Vector3
    rotation: BABYLON.Vector3
}

/** 経歴項目インターフェース */
export interface CareerItem {
    date: string
    title: string
    subtitle: string
    description: string
}

/** スキル項目インターフェース */
export interface SkillItem {
    name: string
    experience: number
    liking: number
}

/** UIの詳細設定 */
export const UI_CONFIG = {
    welcomeText: {
        color: 'white',
        fontSize: 24,
        top: '-40%',
        lineSpacing: 20
    },
    board: {
        width: 4,
        height: 3,
        texture: {
            width: 1024,
            height: 768
        }
    },
    profile: {
        image: {
            width: '200px',
            height: '200px',
            paddingBottom: '20px'
        },
        name: {
            fontSize: 36,
            height: '60px',
            paddingBottom: '20px'
        },
        title: {
            fontSize: 28,
            height: '50px',
            paddingBottom: '20px',
            color: 'gray'
        },
        bio: {
            fontSize: 22,
            height: '400px',
            lineSpacing: '15px',
            paddingLeft: '50px'
        }
    },
    timeline: {
        title: {
            fontSize: 32,
            height: '60px',
            paddingBottom: '20px'
        },
        item: {
            height: '60px',
            paddingBottom: '20px',
            dot: {
                width: '20px',
                height: '20px'
            },
            year: {
                fontSize: 20,
                width: '100px',
                paddingLeft: '10px'
            },
            title: {
                fontSize: 24
            }
        }
    },
    skill: {
        bar: {
            width: '40px'
        },
        text: {
            height: '30px',
            width: '40px'
        }
    }
} as const

/** 経歴データの定義 */
export const CAREER_DATA: CareerItem[] = [
    {
        date: '2000/07',
        title: '生まれる',
        subtitle: '',
        description: '埼玉県で生まれる'
    },
    {
        date: '2019/03',
        title: '高校卒業',
        subtitle: 'いざ東京へ',
        description: '高校卒業の数日後に上京。日経新聞社社寮という名の大田区にあるボロボロの販売店に配属'
    },
    {
        date: '2021/03',
        title: '専門学校卒業',
        subtitle: 'いざ札幌へ',
        description: '日本工学院専門学校の情報処理科システム開発コースを卒業し同時期に新聞奨学生も卒業'
    },
    {
        date: '2021/04',
        title: '第三者検証の企業に就職',
        subtitle: '就職を機に札幌へ北上',
        description: '日本ナレッジ株式会社札幌支社に就職。基幹業務システムの仕様追加等の業務に従事'
    },
    {
        date: '2022/09',
        title: '転職',
        subtitle: '他の会社へ転職',
        description: 'さまざまな案件を経験するために株式会社エスプランニングへ転職'
    }
]

/** スキルデータの定義 */
export const SKILLS_DATA: SkillItem[] = [
    { name: 'Vue.js', experience: 50, liking: 80 },
    { name: 'React', experience: 0, liking: 0 },
    { name: 'HTML/CSS', experience: 80, liking: 80 },
    { name: 'Nuxt.js', experience: 20, liking: 20 },
    { name: 'PHP', experience: 10, liking: 10 },
    { name: 'Node.js', experience: 10, liking: 20 },
    { name: 'Python(Django)', experience: 10, liking: 20 },
    { name: 'MySQL', experience: 10, liking: 20 },
    { name: 'PostgreSQL', experience: 0, liking: 0 },
    { name: 'SQL Server', experience: 30, liking: 20 },
    { name: 'MongoDB', experience: 0, liking: 0 },
    { name: 'Oracle', experience: 0, liking: 0 },
    { name: 'EC2', experience: 0, liking: 0 },
    { name: 'S3', experience: 0, liking: 0 },
    { name: 'Lambda', experience: 0, liking: 0 },
    { name: 'CloudFront', experience: 0, liking: 0 }
]

/** ライト設定インターフェース */
export interface LightConfig {
    hemispheric: {
        name: string
        direction: BABYLON.Vector3
    }
    directional: {
        name: string
        direction: BABYLON.Vector3
    }
}

/** ライトのデフォルト設定 */
export const LIGHT_CONFIG: LightConfig = {
    hemispheric: {
        name: 'hemisphericLight',
        direction: new BABYLON.Vector3(0, 1, 0)
    },
    directional: {
        name: 'directionalLight',
        direction: new BABYLON.Vector3(-1, -2, -1)
    }
} as const

/** トリガー設定インターフェース */
export interface TriggerConfig {
    position: BABYLON.Vector3
    range: number
}

/** 階段のトリガー設定 */
export const STAIR_TRIGGER_CONFIG: TriggerConfig = {
    position: new BABYLON.Vector3(3, 1, 9),
    range: 2
} as const