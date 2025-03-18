<script setup lang="ts">
import { ref } from 'vue'

const title = ref('このサイトについて')
const description = ref([
    '勉強の内容や成果物を公開するサイトです。',
    '経歴やスキルなども公開しています。'
])
</script>

<template>
    <v-container id="aboutSection" class="about-section">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
                <!-- ロゴセクション -->
                <div class="logo-container">
                    <v-img
                        src="../../../assets/logo.svg"
                        height="200"
                        class="logo-image"
                        cover
                        :eager="true"
                        alt="サイトロゴ"
                    >
                        <template v-slot:placeholder>
                            <v-row class="fill-height" align="center" justify="center">
                                <v-progress-circular
                                    indeterminate
                                    color="primary"
                                ></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </div>

                <!-- タイトルと説明セクション -->
                <div class="content-section">
                    <h1 class="text-h3 font-weight-bold mb-6">{{ title }}</h1>
                    <v-card variant="text" class="description-card">
                        <v-card-text>
                            <p v-for="(text, index) in description" :key="index" class="description-text">
                                {{ text }}
                            </p>
                        </v-card-text>
                    </v-card>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.about-section {
    padding-top: 100px;
    padding-bottom: 100px;
    min-height: 100vh;
    display: flex;
    align-items: center;
}

.logo-container {
    margin-bottom: 48px;
    max-width: 400px;
    margin-inline: auto;
}

.logo-image {
    transition: transform 0.3s ease;
}

.logo-image:hover {
    transform: scale(1.05);
}

.content-section {
    animation: fadeIn 0.8s ease-out;
}

.description-card {
    background-color: transparent;
}

.description-text {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1rem;
}

.description-text:last-child {
    margin-bottom: 0;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 600px) {
    .about-section {
        padding-top: 60px;
        padding-bottom: 60px;
        min-height: auto;
    }

    .logo-container {
        margin-bottom: 32px;
    }

    .text-h3 {
        font-size: 2rem !important;
    }

    .description-text {
        font-size: 1rem;
        line-height: 1.6;
    }
}

@media (max-width: 400px) {
    .text-h3 {
        font-size: 1.75rem !important;
    }
}
</style>
