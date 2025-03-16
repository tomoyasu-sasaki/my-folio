<template>
    <v-container class="fill-height text-center py-10" fluid>
        <v-row class="justify-center align-center">
            <v-col cols="12" md="8" lg="6">
                <h1 class="display-3 font-weight-bold mb-4">403 Forbidden</h1>
                <p class="subtitle-1 mb-6">
                    アクセスが拒否されました。
                    <br />
                    このページには特定の条件でのみアクセス可能です。
                    <br />
                    babylonjsを使用してみました。
                </p>
                <!-- Babylon.js のシーンを表示 -->
                <BabylonScene class="mb-6" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import BabylonScene from '../components/babylon/ForbiddenScene.vue'
</script>

<style scoped>
.fill-height {
    min-height: 100vh;
}
</style>
