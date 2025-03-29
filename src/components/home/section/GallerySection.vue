<script setup lang="ts">
import { useGalleryData } from '../../../composables/useGalleryData'
import { useTranslation } from '../../../composables/useTranslation'
import type { GalleryItemWithTranslation } from '../../../composables/useGalleryData'
import type { SectionName } from '../../../locales/types'
import GalleryCard from '../parts/GalleryCard.vue'
import { computed, ref, onMounted } from 'vue'

// 表示モードの型定義
type DisplayMode = 'grid' | 'carousel'

// レイアウト設定の型定義
interface LayoutConfig {
    readonly grid: {
        readonly breakpoints: {
            readonly cols: number
            readonly sm: number
            readonly md: number
            readonly lg: number
        }
    }
    readonly carousel: {
        readonly height: number
        readonly mobileHeight: number
        readonly interval: number
    }
    readonly spacing: {
        readonly padding: {
            readonly top: {
                readonly default: number
                readonly mobile: number
            }
            readonly bottom: {
                readonly default: number
                readonly mobile: number
            }
        }
    }
    readonly breakpoints: {
        readonly mobile: number
    }
}

// 翻訳の型定義
interface Translations {
    readonly showAll: string
    readonly title: string
    readonly description: string
}

const { initialize, allItems } = useGalleryData()
const { t } = useTranslation()

// セクション情報の翻訳を取得する関数
const getSectionTranslation = (key: string): string => {
    const section: SectionName = 'galleryData'
    return t({ section, key: 'section', subKey: key })
}

// フィルター関連の翻訳を取得する関数
const getFilterTranslation = (key: string): string => {
    const section: SectionName = 'gallery'
    return t({ section, key: 'filter', subKey: key, itemId: 'text' })
}

const items = computed<GalleryItemWithTranslation[]>(() => allItems.value)

// 月別のアイテムをメモ化
const itemsByMonth = computed(() => {
    const monthMap = new Map<string, GalleryItemWithTranslation[]>()
    items.value.forEach(item => {
        const month = item.createdAt.substring(0, 7)
        const monthItems = monthMap.get(month) || []
        monthItems.push(item)
        monthMap.set(month, monthItems)
    })
    return monthMap
})

// ユニークな月のリストをメモ化
const uniqueMonths = computed<string[]>(() => {
    return Array.from(itemsByMonth.value.keys()).sort().reverse()
})

// フィルタリングされたアイテムをメモ化
const filteredItems = computed<GalleryItemWithTranslation[]>(() => {
    if (!selectedMonth.value) {
        return items.value
    }
    return itemsByMonth.value.get(selectedMonth.value) || []
})

// 表示モード
const displayMode = ref<DisplayMode>('grid')

// 選択された月
const selectedMonth = ref<string | null>(null)

// レイアウト設定
const layoutConfig: LayoutConfig = {
    grid: {
        breakpoints: {
            cols: 12,
            sm: 6,
            md: 4,
            lg: 3
        }
    },
    carousel: {
        height: 600,
        mobileHeight: 400,
        interval: 8000
    },
    spacing: {
        padding: {
            top: {
                default: 100,
                mobile: 60
            },
            bottom: {
                default: 100,
                mobile: 60
            }
        }
    },
    breakpoints: {
        mobile: 600
    }
} as const

// 翻訳テキスト
const translations = computed<Translations>(() => ({
    showAll: getFilterTranslation('showAll'),
    title: getSectionTranslation('text'),
    description: getSectionTranslation('description')
}))

onMounted(() => {
    initialize()
})
</script>

<template>
    <v-container id="GallerySection" class="padding">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
            {{ translations.title }}
        </h2>
        <p class="text-body-1 mb-8 text-center">
            {{ translations.description }}
        </p>
        
        <!-- ヘッダー部分 -->
        <v-row class="mb-4">
            <v-col cols="12" sm="6" class="d-flex align-center">
                <v-chip-group>
                    <v-chip
                        variant="outlined"
                        size="large"
                        :color="!selectedMonth ? 'primary' : undefined"
                        @click="selectedMonth = null"
                    >
                        {{ translations.showAll }}
                    </v-chip>
                    <v-chip
                        v-for="month in uniqueMonths"
                        :key="month"
                        variant="outlined"
                        size="large"
                        :color="selectedMonth === month ? 'primary' : undefined"
                        @click="selectedMonth = month"
                    >
                        {{ month }}
                    </v-chip>
                </v-chip-group>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-end align-center">
                <v-btn-toggle v-model="displayMode" mandatory variant="outlined">
                    <v-btn value="grid" icon="mdi-grid"  />
                    <v-btn value="carousel" icon="mdi-view-carousel"  />
                </v-btn-toggle>
            </v-col>
        </v-row>

        <div class="gallery-container">
            <!-- グリッド表示 -->
            <v-row v-if="displayMode === 'grid'" class="gallery-grid">
                <v-col
                    v-for="item in filteredItems"
                    :key="item.id"
                    :cols="layoutConfig.grid.breakpoints.cols"
                    :sm="layoutConfig.grid.breakpoints.sm"
                    :md="layoutConfig.grid.breakpoints.md"
                    :lg="layoutConfig.grid.breakpoints.lg"
                    class="gallery-item"
                >
                    <GalleryCard :item="item" mode="grid" />
                </v-col>
            </v-row>

            <!-- カルーセル表示 -->
            <div v-else class="carousel-container">
                <v-carousel
                    hide-delimiters
                    show-arrows="hover"
                    :height="layoutConfig.carousel.height"
                    class="gallery-carousel"
                    cycle
                    :interval="layoutConfig.carousel.interval"
                >
                    <v-carousel-item
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="carousel-item"
                    >
                        <GalleryCard :item="item" mode="carousel" />
                    </v-carousel-item>
                </v-carousel>
            </div>
        </div>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: v-bind('layoutConfig.spacing.padding.top.default + "px"');
    padding-bottom: v-bind('layoutConfig.spacing.padding.bottom.default + "px"');
}

.gallery-container {
    position: relative;
    min-height: 400px;
}

.gallery-grid {
    margin: 0 -8px;
}

.gallery-item {
    padding: 8px;
    height: 100%;
}

.carousel-container {
    position: relative;
    width: 100%;
    height: v-bind('layoutConfig.carousel.height + "px"');
}

.gallery-carousel {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.03);
}

.gallery-carousel :deep(.v-carousel__controls) {
    background: rgba(0, 0, 0, 0.3);
}

.carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

@media (max-width: v-bind('layoutConfig.breakpoints.mobile + "px"')) {
    .padding {
        padding-top: v-bind('layoutConfig.spacing.padding.top.mobile + "px"');
        padding-bottom: v-bind('layoutConfig.spacing.padding.bottom.mobile + "px"');
    }

    .carousel-container {
        height: v-bind('layoutConfig.carousel.mobileHeight + "px"');
    }

    .gallery-carousel {
        height: v-bind('layoutConfig.carousel.mobileHeight + "px"') !important;
    }
}
</style>
