<template>
    <!-- Babylon.js のシーンを表示 -->
    <BabylonScene class="mb-6" />
</template>

<script setup lang="ts">
import BabylonScene from '../components/babylon/ForbiddenScene.vue'
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
