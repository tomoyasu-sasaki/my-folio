<script setup lang="ts">
import { computed } from 'vue'
import type { ApexOptions } from 'apexcharts'
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'

// チャートのデータシリーズの型定義
interface ChartSeries {
    readonly name: string
    readonly data: readonly number[]
    readonly color: string
}

// プロップスの型定義
interface Props {
    readonly title: string
    readonly skills: Array<{
        name: string
        level: number
        likes: number
    }>
}

const props = defineProps<Props>()
const { t } = useTranslation()

// 評価基準の翻訳を取得する関数
const getEvaluationTranslation = (key: string): string => {
    const section: SectionName = 'skill'
    return t({ section, key: 'evaluation', subKey: key, itemId: 'text' })
}

// レイアウト設定
const layoutConfig = {
    chart: {
        height: 350,
        fontSize: {
            title: '20px',
            labels: '12px'
        },
        columnWidth: '55%',
        borderRadius: 4,
        padding: {
            top: 20,
            bottom: 20
        }
    },
    card: {
        padding: 4,
        margin: {
            y: 2
        }
    }
} as const

// 基本的なチャートオプションをメモ化
const baseChartOptions = computed<Partial<ApexOptions>>(() => ({
    chart: {
        type: 'bar',
        toolbar: {
            show: false
        },
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
    stroke: {
        width: 2
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
    }
}))

// チャートのラベルとカテゴリーをメモ化
const chartCategories = computed(() => {
    return props.skills.map(skill => skill.name)
})

// チャートのデータをメモ化
const chartData = computed(() => ({
    experience: props.skills.map(skill => skill.level),
    preference: props.skills.map(skill => Math.max(0, skill.likes))
}))

// 最終的なチャートオプションをメモ化
const chartOptions = computed<ApexOptions>(() => ({
    ...baseChartOptions.value,
    xaxis: {
        categories: chartCategories.value,
        labels: {
            style: {
                fontSize: layoutConfig.chart.fontSize.labels
            }
        }
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
            formatter: (val: number): string => `${val}%`
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
    legend: {
        position: 'top',
        horizontalAlign: 'center'
    },
    grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5
    }
}))

// チャートシリーズをメモ化
const chartSeries = computed<readonly ChartSeries[]>(() => [
    {
        name: getEvaluationTranslation('experience'),
        data: chartData.value.experience,
        color: '#2196F3'
    },
    {
        name: getEvaluationTranslation('preference'),
        data: chartData.value.preference,
        color: '#4CAF50'
    }
] as const)
</script>

<template>
    <v-card 
        class="skill-chart"
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
.skill-chart {
    width: 100%;
    height: 100%;
}
</style>
