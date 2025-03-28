<script setup lang="ts">
import type { Project, ProjectStatus } from '../../../stores/project'
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()

interface Props {
    project: Project
}

const props = defineProps<Props>()

const { t } = useTranslation()

// ステータスカラーの型定義
type StatusColorMap = {
    readonly [K in ProjectStatus]: string
}

const statusColors: StatusColorMap = {
    completed: 'success',
    'in-progress': 'info',
    planned: 'warning',
    end: 'error'
} as const

// プロジェクトデータの翻訳を取得する関数
const getProjectTranslation = (key: string): string => {
    const section: SectionName = 'projectData'
    return t({ section, key: 'items', subKey: props.project.id, itemId: key })
}

// アクションやステータスの翻訳を取得する関数
const getTranslation = (category: string, key: string): string => {
    const section: SectionName = 'project'
    return t({ section, key: category, subKey: key, itemId: 'text' })
}

// プロジェクトの画像パスを計算
const imagePath = computed(() => `/my-folio/img/Project/${props.project.image}`)

// 詳細ページへの遷移関数
function navigateToDetail(project: Project): void {
    if (project.url) {
        window.open(project.url, '_blank')
    } else {
        router.push(`/project/${project.id}`)
    }
}
</script>

<template>
    <v-card class="project-card" variant="outlined" elevation="2">
        <v-img
            :src="imagePath"
            height="200"
            width="200"
            cover
            class="project-image"
        />

        <v-card-title class="d-flex align-center">
            {{ getProjectTranslation('title') }}
            <v-chip
                :color="statusColors[project.status]"
                size="small"
                class="ml-2"
                label
            >
                {{ getTranslation('status', project.status) }}
            </v-chip>
        </v-card-title>

        <v-card-subtitle>{{ getProjectTranslation('subtitle') }}</v-card-subtitle>

        <v-card-text v-if="project.description">
            {{ getProjectTranslation('description') }}
            <div class="mt-2">
                <v-chip
                    v-for="tag in project.tags"
                    :key="tag"
                    size="x-small"
                    class="mr-1 mb-1"
                    variant="outlined"
                >
                    {{ tag }}
                </v-chip>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                variant="outlined"
                prepend-icon="mdi-open-in-new"
                @click="navigateToDetail(project)"
            >
                {{ getTranslation('action', 'details') }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped>
.project-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

.project-image {
    transition: opacity 0.2s ease;
    align-self: center;
}

.project-card:hover .project-image {
    opacity: 0.9;
}
</style> 