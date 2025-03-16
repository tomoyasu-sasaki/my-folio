import { BuildingScene } from './parts/BuildingScene'

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
    if (canvas) {
        new BuildingScene(canvas)
    }
})
