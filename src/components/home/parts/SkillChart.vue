<script setup lang="ts">
import { computed } from 'vue'
import type { Skill } from '../../../stores/skill'
import { useLanguageStore } from '../../../stores/language'
import type { SectionName } from '../../../locales/types'
import type { ApexOptions } from 'apexcharts'

// プロップスの型定義
interface Props {
    readonly title: string
    readonly skills: readonly Skill[]
}

// レイアウト設定の型定義
interface LayoutConfig {
    readonly chart: {
        readonly height: number
        readonly fontSize: {
            readonly title: string
            readonly labels: string
        }
        readonly columnWidth: string
        readonly borderRadius: number
    }
    readonly card: {
        readonly padding: number
        readonly margin: {
            readonly y: number
        }
    }
}

// チャートのデータシリーズの型定義
interface ChartSeries {
    readonly name: string
    readonly data: readonly number[]
    readonly color: string
}

const props = defineProps<Props>()
const languageStore = useLanguageStore()

// 評価基準の翻訳を取得する関数
const getEvaluationTranslation = (key: string): string => {
    const section: SectionName = 'skill'
    return languageStore.t(section, 'evaluation', key, 'text')
}

// レイアウト設定
const layoutConfig: LayoutConfig = {
    chart: {
        height: 350,
        fontSize: {
            title: '20px',
            labels: '12px'
        },
        columnWidth: '55%',
        borderRadius: 4
    },
    card: {
        padding: 4,
        margin: {
            y: 2
        }
    }
} as const

// チャートの設定
const chartOptions = computed<ApexOptions>(() => ({
    chart: {
        toolbar: {
            show: false
        },
        type: 'bar',
        fontFamily: 'Roboto, sans-serif',
        background: 'transparent'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: layoutConfig.chart.columnWidth,
            borderRadius: layoutConfig.chart.borderRadius
        }
    },
    xaxis: {
        categories: props.skills.map((skill) => skill.name),
        labels: {
            style: {
                fontSize: layoutConfig.chart.fontSize.labels
            }
        }
    },
    title: {
        text: props.title,
        align: 'center',
        style: {
            fontSize: layoutConfig.chart.fontSize.title,
            fontWeight: 'bold'
        }
    },
    markers: {
        size: 3,
        colors: ['#FF4560'],
        strokeWidth: 2
    },
    tooltip: {
        y: {
            formatter: (val: number): string => `${val}%`
        },
        theme: 'dark'
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
            formatter: (val: number): string => `${val}%`
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center'
    },
    grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5
    }
}))

// チャートのデータシリーズ
const chartSeries = computed<readonly ChartSeries[]>(() => [
    {
        name: getEvaluationTranslation('experience'),
        data: props.skills.map((skill) => skill.level),
        color: '#2196F3'
    },
    {
        name: getEvaluationTranslation('preference'),
        data: props.skills.map((skill) => Math.max(0, skill.likes)),
        color: '#4CAF50'
    }
] as const)
</script>

<template>
    <v-card 
        :class="`pa-${layoutConfig.card.padding} my-${layoutConfig.card.margin.y}`" 
        elevation="2" 
        style="background-color: transparent !important"
    >
        <v-row justify="center">
            <v-col>
                <apexchart
                    type="bar"
                    :height="layoutConfig.chart.height"
                    :options="chartOptions"
                    :series="chartSeries"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
</style>
