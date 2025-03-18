<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Skill } from '../../../stores/skill'
import { useLanguageStore } from '../../../stores/language'

// プロップスの型定義
const props = defineProps<{
    title: string
    skills: Skill[]
}>()

const languageStore = useLanguageStore()

// チャートの設定
const chartOptions = ref({
    chart: {
        toolbar: {
            show: false
        },
        type: 'bar' as const,
        fontFamily: 'Roboto, sans-serif',
        background: 'transparent'
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4
        }
    },
    xaxis: {
        categories: [] as string[],
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    title: {
        text: '',
        align: 'center' as const,
        style: {
            fontSize: '20px',
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
            formatter: (val: number) => `${val}%`
        },
        theme: 'dark'
    },
    yaxis: {
        max: 100,
        tickAmount: 4,
        labels: {
            formatter: (val: number) => `${val}%`
        }
    },
    legend: {
        position: 'top' as const,
        horizontalAlign: 'center' as const
    },
    grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 5
    }
})

// チャートのデータシリーズ
const chartSeries = ref([
    {
        name: languageStore.t('skill', 'experienceLevel'),
        data: [] as number[],
        color: '#2196F3'
    },
    {
        name: languageStore.t('skill', 'likeLevel'),
        data: [] as number[],
        color: '#4CAF50'
    }
])

// 言語変更時にシリーズ名とタイトルを更新する監視関数
watchEffect(() => {
    chartSeries.value[0].name = languageStore.t('skill', 'experienceLevel')
    chartSeries.value[1].name = languageStore.t('skill', 'likeLevel')
    chartOptions.value.title.text = props.title
})

// propsの変更を監視してデータを更新
watchEffect(() => {
    chartOptions.value.xaxis.categories = props.skills.map((skill) => skill.name)
    chartSeries.value[0].data = props.skills.map((skill) => skill.level)
    chartSeries.value[1].data = props.skills.map((skill) => skill.likes)
})
</script>

<template>
    <v-card class="pa-4 my-2" elevation="2" style="background-color: transparent !important">
        <v-row justify="center">
            <v-col>
                <apexchart
                    type="bar"
                    height="350"
                    :options="chartOptions"
                    :series="chartSeries"
                />
            </v-col>
        </v-row>
    </v-card>
</template>

<style scoped>
</style>
