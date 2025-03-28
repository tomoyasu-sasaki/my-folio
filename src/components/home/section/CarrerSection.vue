<script setup lang="ts">
import { useCareerStore } from '../../../stores/career'
import { useLanguageStore } from '../../../stores/language'
import type { CareerCategory, CareerItem } from '../../../stores/career'
import type { SectionName } from '../../../locales/types'
import CareerTimelineItem from '../parts/CareerTimelineItem.vue'
import { computed, ref } from 'vue'

// レイアウト設定の型定義
interface LayoutConfig {
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
        readonly tablet: number
    }
    readonly timeline: {
        readonly maxWidth: number
        readonly padding: {
            readonly default: number
            readonly mobile: number
            readonly tablet: number
        }
    }
    readonly filter: {
        readonly button: {
            readonly minWidth: {
                readonly default: number
                readonly mobile: number
            }
            readonly padding: number
            readonly fontSize: {
                readonly mobile: string
            }
        }
    }
}

// カテゴリー定義
interface CategoryItem {
    readonly value: CareerCategory | null
    readonly label: string
    readonly icon: string
}

// 翻訳の型定義
interface Translations {
    readonly title: string
    readonly description: string
}

const careerStore = useCareerStore()
const languageStore = useLanguageStore()

// セクション情報の翻訳を取得する関数
const getSectionTranslation = (key: string): string => {
    const section: SectionName = 'career'
    return languageStore.t(section, 'section', key) as string
}

// カテゴリー名の翻訳を取得する関数
const getCategoryTranslation = (category: CategoryItem): string => {
    const section: SectionName = 'career'
    if (!category.value) {
        return languageStore.t(section, 'categories', 'all') as string
    }
    return languageStore.t(section, 'categories', category.value) as string
}

const items = computed<CareerItem[]>(() => careerStore.getAllItems)

// カテゴリーフィルター
const selectedCategory = ref<CareerCategory | null>(null)

// カテゴリー一覧
const categories: readonly CategoryItem[] = [
    { value: null, label: 'all', icon: 'mdi-view-list' },
    { value: 'education', label: 'education', icon: 'mdi-school' },
    { value: 'work', label: 'work', icon: 'mdi-briefcase' },
    { value: 'life', label: 'life', icon: 'mdi-account-heart' }
] as const

// レイアウト設定
const layoutConfig: LayoutConfig = {
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
        mobile: 600,
        tablet: 400
    },
    timeline: {
        maxWidth: 1000,
        padding: {
            default: 16,
            mobile: 8,
            tablet: 4
        }
    },
    filter: {
        button: {
            minWidth: {
                default: 100,
                mobile: 50
            },
            padding: 16,
            fontSize: {
                mobile: '0.875rem'
            }
        }
    }
} as const

// フィルター適用後のアイテム
const filteredItems = computed<CareerItem[]>(() => {
    if (!selectedCategory.value) return items.value
    return careerStore.getItemsByCategory(selectedCategory.value)
})

// 翻訳テキスト
const translations = computed<Translations>(() => ({
    title: getSectionTranslation('title'),
    description: getSectionTranslation('description')
}))
</script>

<template>
    <v-container id="careerContainer" class="padding">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
            {{ translations.title }}
        </h2>
        <p class="text-body-1 mb-8 text-center">
            {{ translations.description }}
        </p>

        <!-- フィルターセクション -->
        <v-row class="mb-8">
            <v-col cols="12" class="d-flex justify-center">
                <v-btn-toggle
                    v-model="selectedCategory"
                    mandatory
                    color="primary"
                    class="career-filter"
                >
                    <v-btn
                        v-for="category in categories"
                        :key="category.value || 'all'"
                        :value="category.value"
                        variant="text"
                        class="filter-btn"
                    >
                        <v-icon :icon="category.icon" class="mr-1" />
                        <span class="btn-text">{{ getCategoryTranslation(category) }}</span>
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>

        <!-- タイムライン -->
        <v-timeline 
            side="end" 
            truncate-line="start" 
            class="career-timeline"
            density="comfortable"
            align="start"
        >
            <CareerTimelineItem
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
            />
        </v-timeline>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: v-bind('layoutConfig.spacing.padding.top.default + "px"');
    padding-bottom: v-bind('layoutConfig.spacing.padding.bottom.default + "px"');
}

.career-filter {
    border-radius: 8px;
    overflow: hidden;
    max-width: 100%;
}

.career-timeline {
    max-width: v-bind('layoutConfig.timeline.maxWidth + "px"');
    margin: 0 auto;
    padding: v-bind('`0 ${layoutConfig.timeline.padding.default}px`');
    width: 100%;
}

.filter-btn {
    min-width: v-bind('layoutConfig.filter.button.minWidth.default + "px"');
    padding: v-bind('`0 ${layoutConfig.filter.button.padding}px`');
}

@media (max-width: v-bind('layoutConfig.breakpoints.mobile + "px"')) {
    .padding {
        padding-top: v-bind('layoutConfig.spacing.padding.top.mobile + "px"');
        padding-bottom: v-bind('layoutConfig.spacing.padding.bottom.mobile + "px"');
    }

    .career-filter {
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 8px;
        background-color: transparent;
    }

    .filter-btn {
        min-width: calc(50% - 4px);
        margin: 0 !important;
        border-radius: 4px;
    }

    .btn-text {
        font-size: v-bind('layoutConfig.filter.button.fontSize.mobile');
    }

    .career-timeline {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    :deep(.v-timeline) {
        width: 100%;
        padding-left: v-bind('layoutConfig.timeline.padding.mobile + "px"');
        padding-right: v-bind('layoutConfig.timeline.padding.mobile + "px"');
    }
}

@media (max-width: v-bind('layoutConfig.breakpoints.tablet + "px"')) {
    .filter-btn {
        min-width: 100%;
    }

    .career-timeline {
        padding: 0;
    }

    :deep(.v-timeline) {
        padding-left: v-bind('layoutConfig.timeline.padding.tablet + "px"');
        padding-right: v-bind('layoutConfig.timeline.padding.tablet + "px"');
    }
}
</style>
