import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'

interface BoardConfig {
    width: number
    height: number
    position: BABYLON.Vector3
    rotation: BABYLON.Vector3
}

interface CareerItem {
    date: string
    title: string
    subtitle: string
    description: string
}

interface SkillItem {
    name: string
    experience: number
    liking: number
}

const UI_CONFIG = {
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

const CAREER_DATA: CareerItem[] = [
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

const SKILLS_DATA: SkillItem[] = [
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

/**
 * フロアUIをセットアップします
 */
export function setupFloorUI(scene: BABYLON.Scene, floor: number): void {
    if (!scene) {
        throw new Error('シーンが提供されていません')
    }

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI')
    const welcomeText = createWelcomeText(floor)
    advancedTexture.addControl(welcomeText)

    switch (floor) {
        case 2:
            setupSecondFloor(scene)
            break
        case 1:
            setupFirstFloor(scene)
            break
        default:
            // デフォルトのフロア表示
            break
    }
}

/**
 * ウェルカムテキストを作成します
 */
function createWelcomeText(floor: number): GUI.TextBlock {
    const text = new GUI.TextBlock()
    Object.assign(text, {
        color: UI_CONFIG.welcomeText.color,
        fontSize: UI_CONFIG.welcomeText.fontSize,
        top: UI_CONFIG.welcomeText.top,
        lineSpacing: UI_CONFIG.welcomeText.lineSpacing
    })

    switch (floor) {
        case 2:
            text.text = 'ようこそ my-folio へ\nごゆるりどうぞ'
            break
        case 1:
            text.text = `ここは ${floor} 階です。\n自己紹介、経歴、スキルセットをご覧いただけます。`
            break
        default:
            text.text = `ここは ${floor} 階です。`
    }

    return text
}

/**
 * 掲示板を作成します
 */
function createBoard(scene: BABYLON.Scene, config: BoardConfig): BABYLON.Mesh {
    const board = BABYLON.MeshBuilder.CreatePlane(
        'board',
        { width: UI_CONFIG.board.width, height: UI_CONFIG.board.height },
        scene
    )
    board.position = config.position
    board.rotation = config.rotation
    return board
}

/**
 * 掲示板のテクスチャを作成します
 */
function createBoardTexture(board: BABYLON.Mesh): GUI.AdvancedDynamicTexture {
    return GUI.AdvancedDynamicTexture.CreateForMesh(
        board,
        UI_CONFIG.board.texture.width,
        UI_CONFIG.board.texture.height
    )
}

/**
 * 背景を作成します
 */
function createBackground(): GUI.Rectangle {
    const background = new GUI.Rectangle()
    background.width = '100%'
    background.height = '100%'
    background.background = 'white'
    background.alpha = 0.8
    return background
}

/**
 * 2階のセットアップを行います
 */
function setupSecondFloor(scene: BABYLON.Scene): void {
    const boardConfig: BoardConfig = {
        width: UI_CONFIG.board.width,
        height: UI_CONFIG.board.height,
        position: new BABYLON.Vector3(4.9, 2, -3),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0)
    }

    const board = createBoard(scene, boardConfig)
    const texture = createBoardTexture(board)
    const background = createBackground()
    texture.addControl(background)

    const floorGuide = createFloorGuide()
    background.addControl(floorGuide)
}

/**
 * フロア案内を作成します
 */
function createFloorGuide(): GUI.TextBlock {
    const guide = new GUI.TextBlock()
    guide.text =
        'フロア案内\n' +
        '・1階（ロビー）: ウェルカムメッセージ\n' +
        '・2階（自己紹介）: プロフィール、経歴、資格\n' +
        '・3階（プロジェクト）: 過去のプロジェクト一覧と詳細\n' +
        '・4階（スキルセット）: プログラミング言語、ツール、\n              技術スタックの紹介\n' +
        '・5階（連絡先）: お問い合わせフォーム、SNSリンク'
    guide.color = 'black'
    guide.fontSize = 40
    guide.lineSpacing = 30
    guide.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    guide.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    guide.paddingTop = '20px'
    guide.paddingLeft = '20px'
    return guide
}

/**
 * 1階のセットアップを行います
 */
function setupFirstFloor(scene: BABYLON.Scene): void {
    setupProfileBoard(scene)
    setupCareerBoard(scene)
    setupSkillsBoard(scene)
}

/**
 * プロフィールボードをセットアップします
 */
function setupProfileBoard(scene: BABYLON.Scene): void {
    const boardConfig: BoardConfig = {
        width: UI_CONFIG.board.width,
        height: UI_CONFIG.board.height,
        position: new BABYLON.Vector3(4.9, 2, -3),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0)
    }

    const board = createBoard(scene, boardConfig)
    const texture = createBoardTexture(board)
    const background = createBackground()
    texture.addControl(background)

    const profileStack = createProfileStack()
    background.addControl(profileStack)

    addProfileContent(profileStack)
}

/**
 * プロフィールスタックを作成します
 */
function createProfileStack(): GUI.StackPanel {
    const stack = new GUI.StackPanel()
    stack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    stack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    stack.paddingTop = '20px'
    stack.width = '90%'
    stack.height = '100%'
    return stack
}

/**
 * プロフィールの内容を追加します
 */
function addProfileContent(stack: GUI.StackPanel): void {
    // プロフィール画像
    const image = new GUI.Image('profileImage', '/logo2.svg')
    Object.assign(image, UI_CONFIG.profile.image)
    stack.addControl(image)

    // 氏名
    const name = new GUI.TextBlock()
    name.text = '佐々木智康'
    name.color = 'black'
    Object.assign(name, UI_CONFIG.profile.name)
    name.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    stack.addControl(name)

    // 肩書き
    const title = new GUI.TextBlock()
    title.text = 'ソフトウェアエンジニア'
    Object.assign(title, UI_CONFIG.profile.title)
    title.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    stack.addControl(title)

    // 自己紹介
    const bio = new GUI.TextBlock()
    bio.text =
        'こんにちは、ソフトウェアエンジニアの佐々木智康です。\nフロントエンド開発を中心に、Vue.jsやTypeScriptを得意としています。\nIT系の専門学校に進学し、卒業後は札幌の第三者検証の会社に就職しました。\n現在は転職しWebアプリケーションのフロントエンド開発を行っています。\n問題解決能力とチームワークを大切にし、新技術のキャッチアップにも積極的です。\n趣味は読書とお酒で、自然の中でリフレッシュしています。\n今後はAI技術を活用したサービス開発に挑戦したいと考えています。'
    bio.color = 'black'
    Object.assign(bio, UI_CONFIG.profile.bio)
    bio.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    bio.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    stack.addControl(bio)
}

/**
 * 経歴ボードをセットアップします
 */
function setupCareerBoard(scene: BABYLON.Scene): void {
    const boardConfig: BoardConfig = {
        width: UI_CONFIG.board.width,
        height: UI_CONFIG.board.height,
        position: new BABYLON.Vector3(4.9, 2, 2),
        rotation: new BABYLON.Vector3(0, Math.PI / 2, 0)
    }

    const board = createBoard(scene, boardConfig)
    const texture = createBoardTexture(board)
    const background = createBackground()
    texture.addControl(background)

    const timelineStack = createTimelineStack()
    background.addControl(timelineStack)

    addTimelineContent(timelineStack)
}

/**
 * タイムラインスタックを作成します
 */
function createTimelineStack(): GUI.StackPanel {
    const stack = new GUI.StackPanel()
    stack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    stack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    stack.width = '90%'
    stack.height = '100%'
    stack.paddingTop = '20px'
    return stack
}

/**
 * タイムラインの内容を追加します
 */
function addTimelineContent(stack: GUI.StackPanel): void {
    // タイトル
    const title = new GUI.TextBlock()
    title.text = '経歴・職歴'
    title.color = 'black'
    Object.assign(title, UI_CONFIG.timeline.title)
    title.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    stack.addControl(title)

    // タイムラインアイテム
    CAREER_DATA.forEach(item => {
        const itemStack = createTimelineItem(item)
        stack.addControl(itemStack)
    })
}

/**
 * タイムラインアイテムを作成します
 */
function createTimelineItem(item: CareerItem): GUI.StackPanel {
    const itemStack = new GUI.StackPanel()
    itemStack.isVertical = false
    itemStack.width = '100%'
    Object.assign(itemStack, UI_CONFIG.timeline.item)

    // ドット
    const dot = new GUI.Ellipse()
    Object.assign(dot, UI_CONFIG.timeline.item.dot)
    dot.color = 'gray'
    dot.thickness = 2
    dot.background = 'white'
    itemStack.addControl(dot)

    // 年
    const year = new GUI.TextBlock()
    year.text = item.date
    year.color = 'gray'
    Object.assign(year, UI_CONFIG.timeline.item.year)
    year.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    itemStack.addControl(year)

    // イベント
    const event = new GUI.TextBlock()
    event.text = item.title
    event.color = 'black'
    Object.assign(event, UI_CONFIG.timeline.item.title)
    event.width = '100%'
    event.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    itemStack.addControl(event)

    return itemStack
}

/**
 * スキルボードをセットアップします
 */
function setupSkillsBoard(scene: BABYLON.Scene): void {
    const boardConfig: BoardConfig = {
        width: UI_CONFIG.board.width,
        height: UI_CONFIG.board.height,
        position: new BABYLON.Vector3(-4.9, 2, 1),
        rotation: new BABYLON.Vector3(0, -Math.PI / 2, 0)
    }

    const board = createBoard(scene, boardConfig)
    const texture = createBoardTexture(board)
    const background = createBackground()
    texture.addControl(background)

    const skillStack = createSkillStack()
    background.addControl(skillStack)

    addSkillContent(skillStack)
}

/**
 * スキルスタックを作成します
 */
function createSkillStack(): GUI.StackPanel {
    const stack = new GUI.StackPanel()
    stack.width = '90%'
    stack.height = '100%'
    stack.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    stack.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    stack.paddingTop = '20px'
    return stack
}

/**
 * スキルの内容を追加します
 */
function addSkillContent(stack: GUI.StackPanel): void {
    SKILLS_DATA.forEach(skill => {
        const skillName = new GUI.TextBlock()
        skillName.text = skill.name
        skillName.height = '40px'
        skillName.width = '150px'
        skillName.color = 'black'
        skillName.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
        stack.addControl(skillName)

        const graphPanel = createSkillGraphPanel(skill)
        stack.addControl(graphPanel)
    })
}

/**
 * スキルグラフパネルを作成します
 */
function createSkillGraphPanel(skill: SkillItem): GUI.StackPanel {
    const panel = new GUI.StackPanel()
    panel.isVertical = false
    panel.height = '100px'
    panel.width = '100%'
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER

    // 経験値バーとテキスト
    addSkillBar(panel, skill.experience, 'blue')
    addSkillText(panel, skill.experience)

    // 好き度バーとテキスト
    addSkillBar(panel, skill.liking, 'green')
    addSkillText(panel, skill.liking)

    return panel
}

/**
 * スキルバーを追加します
 */
function addSkillBar(panel: GUI.StackPanel, value: number, color: string): void {
    const bar = new GUI.Rectangle()
    bar.height = `${value * 1.5}px`
    bar.width = UI_CONFIG.skill.bar.width
    bar.background = color
    bar.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT
    panel.addControl(bar)
}

/**
 * スキル値テキストを追加します
 */
function addSkillText(panel: GUI.StackPanel, value: number): void {
    const text = new GUI.TextBlock()
    text.text = `${value}%`
    Object.assign(text, UI_CONFIG.skill.text)
    text.color = 'black'
    text.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    panel.addControl(text)
}
