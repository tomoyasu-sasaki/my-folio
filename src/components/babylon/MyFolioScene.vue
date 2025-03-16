<template>
    <canvas id="renderCanvas" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { BuildingScene } from './parts/BuildingScene'

onMounted(() => {
    const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement
    new BuildingScene(canvas)
})
</script>

<style>
#renderCanvas {
    width: 100%;
    height: 100%;
}
</style>
