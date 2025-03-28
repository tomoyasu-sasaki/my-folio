<script setup lang="ts">
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'
import { computed } from 'vue'

// 翻訳関連の型定義
interface Translations {
    title: string
    intro: string
    philosophy: string
}

// ロゴ設定の型定義
interface LogoConfig {
    readonly src: string
    readonly height: number
    readonly alt: string
}

const { t } = useTranslation()

// 翻訳関数の型定義
const getTranslation = (key: string, subKey?: string, field?: string): string => {
    const section: SectionName = 'about'
    if (field) {
        return t({ section, key, subKey, itemId: field })
    }
    return t({ section, key, subKey })
}

// 翻訳テキストを計算
const translations = computed<Translations>(() => ({
    title: getTranslation('introduction', 'content', 'text'),
    intro: getTranslation('introduction', 'content', 'description'),
    philosophy: getTranslation('philosophy', 'content', 'description')
}))

// 画像設定
const logoConfig: LogoConfig = {
    src: '../../../assets/logo.svg',
    height: 200,
    alt: 'サイトロゴ'
} as const

// レイアウト設定の型定義
interface LayoutConfig {
    readonly spacing: {
        readonly padding: {
            readonly top: number
            readonly bottom: number
        }
    }
    readonly breakpoints: {
        readonly mobile: number
        readonly tablet: number
    }
}

const layoutConfig: LayoutConfig = {
    spacing: {
        padding: {
            top: 100,
            bottom: 100
        }
    },
    breakpoints: {
        mobile: 600,
        tablet: 400
    }
} as const
</script>

<template>
    <v-container id="aboutSection" class="about-section">
        <v-row justify="center" align="center">
            <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
                <!-- ロゴセクション -->
                <div class="logo-container">
                    <v-img
                        src="../../../assets/logo.svg"
                        :height="logoConfig.height"
                        class="logo-image"
                        cover
                        :eager="true"
                        :alt="logoConfig.alt"
                    >
                        <template #placeholder>
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
                    <h1 class="text-h3 font-weight-bold mb-6">{{ translations.title }}</h1>

                    <v-card variant="text" class="description-card">
                        <v-card-text>
                            <p class="description-text">
                                {{ translations.intro }}
                            </p>
                            <p class="description-text">
                                {{ translations.philosophy }}
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
    padding-top: v-bind('layoutConfig.spacing.padding.top + "px"');
    padding-bottom: v-bind('layoutConfig.spacing.padding.bottom + "px"');
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

@media (max-width: v-bind('layoutConfig.breakpoints.mobile + "px"')) {
    .about-section {
        padding-top: v-bind('layoutConfig.spacing.padding.top * 0.6 + "px"');
        padding-bottom: v-bind('layoutConfig.spacing.padding.bottom * 0.6 + "px"');
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

@media (max-width: v-bind('layoutConfig.breakpoints.tablet + "px"')) {
    .text-h3 {
        font-size: 1.75rem !important;
    }
}
</style>
