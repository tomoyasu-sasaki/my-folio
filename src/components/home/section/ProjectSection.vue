<script setup lang="ts">
import ProjectCard from '../parts/ProjectCard.vue'
import { useProjectData } from '../../../composables/useProjectData'
import { useTranslation } from '../../../composables/useTranslation'
import type { ProjectWithTranslation } from '../../../composables/useProjectData'
import type { SectionName } from '../../../locales/types'
import { computed } from 'vue'

// レイアウト設定の型定義
interface GridBreakpoints {
    cols: number
    sm: number
    md: number
}

interface SpacingConfig {
    padding: {
        top: number
        bottom: number
    }
}

interface LayoutConfig {
    grid: {
        breakpoints: GridBreakpoints
    }
    spacing: SpacingConfig
}

const { allProjects } = useProjectData()
const { t } = useTranslation()
const projects = computed<ProjectWithTranslation[]>(() => allProjects.value)

// 翻訳関数の定義
const getTranslation = (key: string, subKey?: string): string => {
    const section: SectionName = 'project'
    return t({ section, key: 'section', subKey: key, itemId: subKey })
}

// レイアウト設定
const layoutConfig: LayoutConfig = {
    grid: {
        breakpoints: {
            cols: 12,
            sm: 6,
            md: 4
        }
    },
    spacing: {
        padding: {
            top: 100,
            bottom: 100
        }
    }
} as const
</script>

<template>
    <v-container id="projectContainer" class="padding">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
            {{ getTranslation('title', 'text') }}
        </h2>
        <p class="text-body-1 mb-8 text-center">
            {{ getTranslation('description', 'text') }}
        </p>
        <v-row>
            <v-col
                v-for="project in projects"
                :key="project.id"
                :cols="layoutConfig.grid.breakpoints.cols"
                :sm="layoutConfig.grid.breakpoints.sm"
                :md="layoutConfig.grid.breakpoints.md"
            >
                <ProjectCard :project="project" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: v-bind('layoutConfig.spacing.padding.top + "px"');
    padding-bottom: v-bind('layoutConfig.spacing.padding.bottom + "px"');
}

@media (max-width: 600px) {
    .padding {
        padding-top: v-bind('layoutConfig.spacing.padding.top * 0.6 + "px"');
        padding-bottom: v-bind('layoutConfig.spacing.padding.bottom * 0.6 + "px"');
    }
}
</style>
