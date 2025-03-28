<script setup lang="ts">
import SkillChart from '../parts/SkillChart.vue'
import { useSkillStore } from '../../../stores/skill'
import type { SkillCategory, Skill } from '../../../stores/skill'
import { useLanguageStore } from '../../../stores/language'
import type { SectionName } from '../../../locales/types'
import { computed } from 'vue'

// カテゴリースキルの型定義
interface CategorySkill {
    readonly category: SkillCategory
    readonly title: string
    readonly skills: Skill[]
}

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

const skillStore = useSkillStore()
const languageStore = useLanguageStore()

// カテゴリー名の翻訳を取得する関数
const getCategoryTranslation = (category: SkillCategory): string => {
    const section: SectionName = 'skill'
    return languageStore.t(section, 'categories', 'names', category)
}

// カテゴリーの定義
const categories: readonly SkillCategory[] = ['frontend', 'backend', 'database', 'infrastructure'] as const

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

// カテゴリーごとのスキルデータを計算
const categorySkills = computed<CategorySkill[]>(() => 
    categories.map(category => ({
        category,
        title: getCategoryTranslation(category),
        skills: skillStore.getSkillsByCategory(category)
    }))
)
</script>

<template>
    <v-container id="skillContainer" class="padding">
        <v-row>
            <v-col
                v-for="{ category, title, skills } in categorySkills"
                :key="category"
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
