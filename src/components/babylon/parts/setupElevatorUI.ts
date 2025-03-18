import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'
import type { FloorInfo, ElevatorUIComponents } from '../types/index'
import { FLOOR_INFO, UI_SETTINGS } from '../types/index'
/**
 * エレベーターUIをセットアップします
 */
export function setupElevatorUI(
    scene: BABYLON.Scene,
    floor: number,
    camera: BABYLON.UniversalCamera,
    models: { elevatorMesh?: BABYLON.AbstractMesh },
    moveToFloor: (floor: number) => void
): void {
    if (!scene || !camera) {
        throw new Error('必要なコンポーネントが提供されていません')
    }

    const advancedTexture = createFullscreenUI()
    const uiComponents = createElevatorUIComponents(floor, moveToFloor)
    advancedTexture.addControl(uiComponents.panel)

    setupInteractionHandling(scene, camera, models, uiComponents.panel)
}

/**
 * フルスクリーンUIを作成します
 */
function createFullscreenUI(): GUI.AdvancedDynamicTexture {
    return GUI.AdvancedDynamicTexture.CreateFullscreenUI('ElevatorUI')
}

/**
 * エレベーターUIコンポーネントを作成します
 */
function createElevatorUIComponents(
    currentFloor: number,
    moveToFloor: (floor: number) => void
): ElevatorUIComponents {
    const panel = createPanel()
    const label = createLabel()
    panel.addControl(label)

    const availableFloors = FLOOR_INFO.filter(f => f.floor !== currentFloor)
    const buttons = createFloorButtons(availableFloors, moveToFloor, panel)

    return { panel, label, buttons }
}

/**
 * パネルを作成します
 */
function createPanel(): GUI.StackPanel {
    const panel = new GUI.StackPanel()
    panel.width = UI_SETTINGS.panel.width
    panel.isVertical = true
    panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    panel.isVisible = false
    return panel
}

/**
 * ラベルを作成します
 */
function createLabel(): GUI.TextBlock {
    const label = new GUI.TextBlock()
    label.text = UI_SETTINGS.label.text
    label.height = UI_SETTINGS.label.height
    label.color = UI_SETTINGS.label.color
    label.fontSize = UI_SETTINGS.label.fontSize
    return label
}

/**
 * フロアボタンを作成します
 */
function createFloorButtons(
    floors: FloorInfo[],
    moveToFloor: (floor: number) => void,
    panel: GUI.StackPanel
): GUI.Button[] {
    return floors.map(floorItem => {
        const button = GUI.Button.CreateSimpleButton(
            `floorButton_${floorItem.section}`,
            floorItem.section
        )
        
        button.width = UI_SETTINGS.button.width
        button.height = UI_SETTINGS.button.height
        button.color = UI_SETTINGS.button.color
        button.fontSize = UI_SETTINGS.button.fontSize
        button.background = UI_SETTINGS.button.background

        button.onPointerUpObservable.add(() => {
            handleFloorSelection(floorItem, panel, moveToFloor)
        })

        panel.addControl(button)
        return button
    })
}

/**
 * フロア選択時の処理を行います
 */
function handleFloorSelection(
    floorItem: FloorInfo,
    panel: GUI.StackPanel,
    moveToFloor: (floor: number) => void
): void {
    alert(`${floorItem.section} へ移動します`)
    panel.isVisible = false
    moveToFloor(floorItem.floor)
}

/**
 * エレベーターとの距離に基づくUI表示制御を設定します
 */
function setupInteractionHandling(
    scene: BABYLON.Scene,
    camera: BABYLON.UniversalCamera,
    models: { elevatorMesh?: BABYLON.AbstractMesh },
    panel: GUI.StackPanel
): void {
    let isUIVisible = false

    scene.registerBeforeRender(() => {
        if (!models.elevatorMesh) return

        const distanceToElevator = BABYLON.Vector3.Distance(
            camera.position,
            models.elevatorMesh.position
        )

        const shouldBeVisible = distanceToElevator < UI_SETTINGS.interaction.elevatorDistance

        if (shouldBeVisible !== isUIVisible) {
            panel.isVisible = shouldBeVisible
            isUIVisible = shouldBeVisible
        }
    })
}
