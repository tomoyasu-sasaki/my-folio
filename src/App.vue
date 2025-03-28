<template>
    <v-app>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { initializeNormalizedStores } from './stores/normalized/initializeStores'

// ストアの初期化
onMounted(() => {
    initializeNormalizedStores()
})
</script>
