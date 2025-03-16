<script setup lang="ts">
import { ref, watchEffect } from 'vue'
// 型定義
interface Skill {
    name: string
    level: number
    likes: number
}
// propsの型定義
const props = defineProps<{
    title: string
    skills: Skill[]
}>()
// chartOptionsの型定義
const chartOptions = ref({
    chart: {
        toolbar: {
            show: false
        },
        type: 'bar' as const // 'radar'を文字列リテラル型にする
    },
    xaxis: {
        categories: [] as string[] // カテゴリーは文字列の配列
    },
    title: {
        text: '' as string
    },
    markers: {
        size: 3,
        colors: ['#FF4560'],
        strokeWidth: 2
    },
    tooltip: {
        y: {
            formatter: (val: number) => `${val} %`
        }
    },
    yaxis: {
        max: 100,
        stepSize: 25
    }
})
// chartSeriesの型定義
const chartSeries = ref([
    {
        name: '経験レベル (%)',
        data: [] as number[] // 数値の配列
    },
    {
        name: '好き度（%）',
        data: [] as number[] // 数値の配列
    }
])
// propsの変更を監視してデータを更新
watchEffect(() => {
    chartOptions.value.xaxis.categories = props.skills.map((skill) => skill.name)
    chartSeries.value[0].data = props.skills.map((skill) => skill.level)
    chartSeries.value[1].data = props.skills.map((skill) => skill.likes)
    chartOptions.value.title.text = props.title
})
</script>

<template>
    <v-row justify="center">
        <v-col>
            <apexchart :options="chartOptions" :series="chartSeries" />
        </v-col>
    </v-row>
</template>
