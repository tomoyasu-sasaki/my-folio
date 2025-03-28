<script setup lang="ts">
import type { GalleryItemWithTranslation } from '../../../composables/useGalleryData'
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'
import { ref, computed } from 'vue'
import type { CSSProperties } from 'vue'

// プロップスの型定義
interface Props {
    item: GalleryItemWithTranslation
    mode: 'grid' | 'carousel'
}

// AIモデル関連の型定義
type AIModel = 'DALL-E2' | 'Midjourney' | 'Stable Diffusion'
type AIModelColor = 'info' | 'success' | 'warning'

type AIModelConfig = Record<AIModel, AIModelColor>

// レイアウト設定の型定義
interface LayoutConfig {
    grid: {
        aspectRatio: string
        imageHeight: number
        titleLines: number
        descriptionLines: number
    }
    carousel: {
        aspectRatio: string
        imageHeight: number
        titleLines: number
        descriptionLines: number
    }
    animation: {
        duration: string
        scale: number
    }
    overlay: {
        opacity: number
        padding: number
    }
    spacing: {
        borderRadius: number
        imageHeight: {
            mobile: number
            carousel: number
            carouselMobile: number
        }
    }
}

const props = defineProps<Props>()
const dialog = ref(false)
const { t } = useTranslation()

// AIモデルの色設定
const aiModelColors: AIModelConfig = {
    'DALL-E2': 'info',
    'Midjourney': 'success',
    'Stable Diffusion': 'warning'
} as const

// レイアウト設定
const layoutConfig: LayoutConfig = {
    grid: {
        aspectRatio: '4/3',
        imageHeight: 200,
        titleLines: 2,
        descriptionLines: 3
    },
    carousel: {
        aspectRatio: '16/9',
        imageHeight: 400,
        titleLines: 2,
        descriptionLines: 4
    },
    animation: {
        duration: '0.3s',
        scale: 1.02
    },
    overlay: {
        opacity: 0.7,
        padding: 16
    },
    spacing: {
        borderRadius: 8,
        imageHeight: {
            mobile: 200,
            carousel: 600,
            carouselMobile: 400
        }
    }
} as const

// 現在のモードのレイアウト設定を取得
const currentLayout = computed(() => layoutConfig[props.mode])

// 画像のスタイル
const imageStyle = computed<CSSProperties>(() => ({
    height: `${currentLayout.value.imageHeight}px`,
    aspectRatio: currentLayout.value.aspectRatio,
    objectFit: 'cover'
}))

// タイトルのスタイル
const titleStyle = computed<CSSProperties>(() => ({
    display: '-webkit-box',
    WebkitLineClamp: currentLayout.value.titleLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
} as CSSProperties))

// 説明文のスタイル
const descriptionStyle = computed<CSSProperties>(() => ({
    display: '-webkit-box',
    WebkitLineClamp: currentLayout.value.descriptionLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
} as CSSProperties))

// オーバーレイのスタイル
const overlayStyle = computed<CSSProperties>(() => ({
    background: `linear-gradient(to top, rgba(0, 0, 0, ${layoutConfig.overlay.opacity}), transparent)`,
    padding: `${layoutConfig.overlay.padding}px`
}))

// UIテキストの翻訳を取得する関数
const getUITranslation = (category: 'promptInfo' | 'modal', key: string): string => {
    const section: SectionName = 'gallery'
    return t({ section, key: category, subKey: key, itemId: 'text' })
}

// ギャラリーアイテムの翻訳を取得する関数
const getItemTranslation = (key: string): string => {
    const section: SectionName = 'galleryData'
    return t({ section, key: 'items', subKey: props.item.id, itemId: key })
}
</script>

<template>
    <div class="gallery-card" :class="{ 'carousel-mode': props.mode === 'carousel' }">
        <!-- サムネイル表示 -->
        <v-img
            :src="props.item.imagePath"
            :style="imageStyle"
            :alt="getItemTranslation('title')"
            class="gallery-image"
            :cover="props.mode === 'grid'"
            :contain="props.mode === 'carousel'"
            :class="{ 'carousel-image': props.mode === 'carousel' }"
            @click="dialog = true"
        >
            <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary" />
                </v-row>
            </template>
            <!-- オーバーレイ情報（グリッドモード時のみ） -->
            <template v-if="props.mode === 'grid'" #default>
                <div class="image-overlay" :style="overlayStyle">
                    <div class="overlay-content">
                        <v-chip :color="aiModelColors[props.item.aiModel]" size="small" class="mb-2">
                            {{ props.item.aiModel }}
                        </v-chip>
                        <div class="text-subtitle-2 font-weight-bold text-truncate" :style="titleStyle">
                            {{ getItemTranslation('title') }}
                        </div>
                        <div class="text-caption">{{ props.item.createdAt }}</div>
                    </div>
                </div>
            </template>
        </v-img>

        <!-- 詳細ダイアログ -->
        <v-dialog v-model="dialog" max-width="90vw" class="gallery-dialog">
            <v-card>
                <v-img
                    :src="props.item.imagePath"
                    :max-height="'80vh'"
                    contain
                    class="dialog-image"
                />
                <v-card-title class="d-flex align-center">
                    {{ getItemTranslation('title') }}
                    <v-chip :color="aiModelColors[props.item.aiModel]" size="small" class="ml-2">
                        {{ props.item.aiModel }}
                    </v-chip>
                </v-card-title>
                <v-card-subtitle>{{ props.item.createdAt }}</v-card-subtitle>
                <v-card-text>
                    <p class="text-wrap" :style="descriptionStyle">{{ getItemTranslation('description') }}</p>
                    <div class="mt-2">
                        <v-chip
                            v-for="tag in props.item.tags"
                            :key="tag"
                            size="x-small"
                            class="mr-1 mb-1"
                            variant="outlined"
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                    <p v-if="props.item.prompt" class="mt-2 text-caption">
                        {{ getUITranslation('promptInfo', 'label') }}: {{ props.item.prompt }}
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" variant="text" @click="dialog = false">
                        {{ getUITranslation('modal', 'closeButton') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.gallery-card {
    position: relative;
    cursor: pointer;
    transition: transform v-bind('layoutConfig.animation.duration') ease;
    height: 100%;
}

.gallery-card:not(.carousel-mode):hover {
    transform: scale(v-bind('layoutConfig.animation.scale'));
}

.gallery-image {
    border-radius: v-bind('`${layoutConfig.spacing.borderRadius}px`');
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.carousel-image {
    height: v-bind('`${layoutConfig.spacing.imageHeight.carousel}px !important`');
    border-radius: 0;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.03);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity v-bind('layoutConfig.animation.duration') ease;
    display: flex;
    align-items: flex-end;
}

.gallery-card:hover .image-overlay {
    opacity: 1;
}

.overlay-content {
    color: white;
    width: 100%;
}

.carousel-mode .gallery-image {
    border-radius: 0;
    box-shadow: none;
}

.gallery-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-image {
    background-color: rgba(0, 0, 0, 0.9);
}

.text-wrap {
    white-space: pre-wrap;
    word-wrap: break-word;
}

@media (max-width: 600px) {
    .gallery-image:not(.carousel-image) {
        height: v-bind('`${layoutConfig.spacing.imageHeight.mobile}px !important`');
    }
    
    .carousel-image {
        height: v-bind('`${layoutConfig.spacing.imageHeight.carouselMobile}px !important`');
    }
}
</style> 