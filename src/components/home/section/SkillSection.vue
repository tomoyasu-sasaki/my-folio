<script setup lang="ts">
import SkillChart from '../parts/SkillChart.vue'
import { useSkillData } from '../../../composables/useSkillData'
import { onMounted } from 'vue'

// レイアウト設定の型定義
interface LayoutConfig {
    readonly spacing: {
        readonly padding: {
            readonly top: number
            readonly bottom: number
        }
    }
    readonly breakpoints: {
        readonly cols: number
        readonly md: number
    }
    readonly animation: {
        readonly transform: {
            readonly hover: number
        }
    }
}

const { initialize, categorySkills } = useSkillData()

// レイアウト設定
const layoutConfig: LayoutConfig = {
    spacing: {
        padding: {
            top: 100,
            bottom: 100
        }
    },
    breakpoints: {
        cols: 12,
        md: 6
    },
    animation: {
        transform: {
            hover: -5
        }
    }
} as const

// 初期化フラグ
let isInitialized = false

onMounted(() => {
    if (!isInitialized) {
        initialize()
        isInitialized = true
    }
})
</script>

<template>
    <v-container id="skillContainer" class="padding">
        <v-row>
            <v-col
                v-for="{ categoryId, title, skills } in categorySkills"
                :key="categoryId"
                :cols="layoutConfig.breakpoints.cols"
                :md="layoutConfig.breakpoints.md"
                class="skill-category"
            >
                <SkillChart
                    :title="title"
                    :skills="skills"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: v-bind('layoutConfig.spacing.padding.top + "px"');
    padding-bottom: v-bind('layoutConfig.spacing.padding.bottom + "px"');
}

.skill-category {
    transition: transform 0.2s ease;
}

.skill-category:hover {
    transform: v-bind('`translateY(${layoutConfig.animation.transform.hover}px)`');
}
</style>
