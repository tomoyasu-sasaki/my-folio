import * as BABYLON from '@babylonjs/core'
import * as GUI from '@babylonjs/gui'

export function setupElevatorUI(
    scene: BABYLON.Scene,
    floor: number,
    camera: BABYLON.UniversalCamera,
    models: { elevatorMesh?: BABYLON.AbstractMesh },
    moveToFloor: (floor: number) => void
): void {
    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('ElevatorUI')

    // エレベーター前のUI
    let elevatorUIVisible = false
    const floorSelectionPanel = new GUI.StackPanel()
    floorSelectionPanel.width = '220px'
    floorSelectionPanel.isVertical = true
    floorSelectionPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    floorSelectionPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER
    floorSelectionPanel.isVisible = false
    advancedTexture.addControl(floorSelectionPanel)

    const floorLabel = new GUI.TextBlock()
    floorLabel.text = '何階へ行きますか？'
    floorLabel.height = '40px'
    floorLabel.color = 'white'
    floorLabel.fontSize = 24
    floorSelectionPanel.addControl(floorLabel)

    let floors = [
        { floor: 1, section: '1階（ロビー）' },
        { floor: 2, section: '2階（自己紹介）' },
        { floor: 3, section: '3階（プロジェクト）' },
        { floor: 4, section: '4階（スキルセット）' },
        { floor: 5, section: '5階（連絡先）' }
    ]

    floors = floors.filter((f) => f.floor !== floor)

    floors.forEach((floorItem) => {
        const button = GUI.Button.CreateSimpleButton(
            `floorButton_${floorItem.section}`,
            floorItem.section
        )
        button.width = '400px'
        button.height = '50px'
        button.color = 'white'
        button.fontSize = 24
        button.background = 'gray'
        button.onPointerUpObservable.add(() => {
            alert(`${floorItem.section} へ移動します`)
            floorSelectionPanel.isVisible = false
            elevatorUIVisible = false
            moveToFloor(floorItem.floor)
        })
        floorSelectionPanel.addControl(button)
    })

    // エレベーターUIの表示制御
    scene.registerBeforeRender(() => {
        if (models.elevatorMesh) {
            const distanceToElevator = BABYLON.Vector3.Distance(
                camera.position,
                models.elevatorMesh.position
            )
            if (distanceToElevator < 3) {
                if (!elevatorUIVisible) {
                    floorSelectionPanel.isVisible = true
                    elevatorUIVisible = true
                }
            } else {
                if (elevatorUIVisible) {
                    floorSelectionPanel.isVisible = false
                    elevatorUIVisible = false
                }
            }
        }
    })
}
