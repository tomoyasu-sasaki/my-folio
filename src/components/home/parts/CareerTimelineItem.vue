<script setup lang="ts">
import type { CareerItem } from '../../../stores/career'
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'

// プロップスの型定義
interface Props {
    readonly item: CareerItem
}

// 日付フォーマット関連の型定義
type MonthName = 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec'
type DateParts = [string, string] // [year, month]

// レイアウト設定の型定義
interface LayoutConfig {
    readonly spacing: {
        readonly itemMarginBottom: number
        readonly dateSectionMinWidth: {
            readonly default: number
            readonly tablet: number
            readonly mobile: number
        }
    }
    readonly fontSize: {
        readonly date: {
            readonly default: string
            readonly tablet: string
            readonly mobile: string
        }
        readonly subtitle: {
            readonly default: string
            readonly tablet: string
            readonly mobile: string
        }
        readonly title: {
            readonly default: string
            readonly tablet: string
            readonly mobile: string
        }
        readonly description: {
            readonly default: string
            readonly tablet: string
        }
    }
}

const props = defineProps<Props>()
const { t, currentLanguage } = useTranslation()

// レイアウト設定
const layoutConfig: LayoutConfig = {
    spacing: {
        itemMarginBottom: 24,
        dateSectionMinWidth: {
            default: 130,
            tablet: 90,
            mobile: 70
        }
    },
    fontSize: {
        date: {
            default: '1.25rem',
            tablet: '1rem',
            mobile: '0.875rem'
        },
        subtitle: {
            default: '1rem',
            tablet: '0.8rem',
            mobile: '0.75rem'
        },
        title: {
            default: '1.25rem',
            tablet: '1rem',
            mobile: '1rem'
        },
        description: {
            default: '1rem',
            tablet: '0.875rem'
        }
    }
} as const

// 日付関連の翻訳を取得する関数
const getDateTranslation = (key: 'year' | 'month'): string => {
    const section: SectionName = 'career'
    return t({ section, key: 'date', subKey: key, itemId: 'text' })
}

// 月名の配列
const monthNames: readonly MonthName[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
] as const

const formatDate = (date: string): string => {
    const [year, month] = date.split('/') as DateParts
    
    if (currentLanguage.value === 'ja') {
        return `${year}${getDateTranslation('year')}${month}${getDateTranslation('month')}`
    } else {
        const monthIndex = parseInt(month) - 1
        return `${monthNames[monthIndex]} ${year}`
    }
}
</script>

<template>
    <v-timeline-item
        :dot-color="props.item.color"
        :icon="props.item.icon"
        size="small"
        class="career-item"
    >
        <template #opposite>
            <div class="date-section">
                <div class="text-h6 date-text">{{ formatDate(props.item.date) }}</div>
                <div v-if="props.item.subtitle" class="text-subtitle-2 subtitle-text">
                    {{ props.item.subtitle }}
                </div>
            </div>
        </template>

        <v-card class="career-card" variant="outlined" :color="props.item.color">
            <v-card-item>
                <v-card-title class="text-h6 card-title">{{ props.item.title }}</v-card-title>
                <v-card-text>
                    <p class="mb-0 description-text">{{ props.item.description }}</p>
                </v-card-text>
            </v-card-item>
        </v-card>
    </v-timeline-item>
</template>

<style scoped>
.career-item {
    margin-bottom: v-bind('`${layoutConfig.spacing.itemMarginBottom}px`');
}

.date-section {
    min-width: v-bind('`${layoutConfig.spacing.dateSectionMinWidth.default}px`');
}

.career-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    max-width: 600px;
    width: 100%;
}

.career-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 600px) {
    .date-section {
        min-width: v-bind('`${layoutConfig.spacing.dateSectionMinWidth.tablet}px`');
    }

    .date-text {
        font-size: v-bind('layoutConfig.fontSize.date.tablet') !important;
        line-height: 1.2;
    }

    .subtitle-text {
        font-size: v-bind('layoutConfig.fontSize.subtitle.tablet') !important;
        line-height: 1.2;
    }

    .card-title {
        font-size: v-bind('layoutConfig.fontSize.title.tablet') !important;
        line-height: 1.4;
        word-break: break-word;
    }

    .description-text {
        font-size: v-bind('layoutConfig.fontSize.description.tablet');
        line-height: 1.4;
        word-break: break-word;
        white-space: pre-wrap;
    }
}

@media (max-width: 400px) {
    .date-section {
        min-width: v-bind('`${layoutConfig.spacing.dateSectionMinWidth.mobile}px`');
        margin-left: -12px;
    }

    .date-text {
        font-size: v-bind('layoutConfig.fontSize.date.mobile') !important;
    }

    .subtitle-text {
        font-size: v-bind('layoutConfig.fontSize.subtitle.mobile') !important;
    }
}
</style> 