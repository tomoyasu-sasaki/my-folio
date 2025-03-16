import { BuildingScene } from '@/components/babylon/parts/BuildingScene'

window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
    if (canvas) {
        new BuildingScene(canvas)
    }
})
