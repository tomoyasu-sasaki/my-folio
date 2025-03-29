<script setup lang="ts">
import type { ProjectWithTranslation } from '../../../composables/useProjectData'
import { useTranslation } from '../../../composables/useTranslation'
import type { SectionName } from '../../../locales/types'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
interface Props {
    project: ProjectWithTranslation
}

const props = defineProps<Props>()
const router = useRouter()
const { t } = useTranslation()

// ステータスカラーの型定義
type StatusColorMap = {
    readonly [K in ProjectWithTranslation['status']]: string
}

const statusColors: StatusColorMap = {
    completed: 'success',
    'in-progress': 'info',
    planned: 'warning',
    end: 'error'
} as const

// アクションやステータスの翻訳を取得する関数
const getTranslation = (category: string, key: string): string => {
    const section: SectionName = 'project'
    return t({ section, key: category, subKey: key, itemId: 'text' })
}

// プロジェクトの画像パスを計算
const imagePath = computed(() => `/my-folio/img/Project/${props.project.image}`)

function navigateToDetail(project: ProjectWithTranslation): void {
    if (project.status === 'end') return
    if (project.url) {
        window.open(project.url, '_blank')
    } else {
        router.push(`/project/${project.id}`)
    }
}
</script>

<template>
    <v-card class="project-card" variant="outlined">
        <v-img :src="imagePath" height="200" cover>
            <template #placeholder>
                <v-row class="fill-height" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
            </template>
        </v-img>

        <v-card-title class="pt-4">
            <div class="d-flex align-center mb-2">
                <v-chip
                    :color="statusColors[project.status]"
                    size="small"
                    class="mr-2"
                >
                    {{ getTranslation('status', project.status) }}
                </v-chip>
                <v-chip
                    color="primary"
                    size="small"
                    variant="outlined"
                >
                    {{ project.language }}
                </v-chip>
            </div>
            <h3 class="text-h6 font-weight-bold">{{ project.title }}</h3>
        </v-card-title>

        <v-card-text>
            <p class="text-body-2 text-grey-darken-1 mb-4">
                {{ project.subtitle }}
            </p>
            <div class="d-flex flex-wrap">
                <v-chip
                    v-for="tag in project.tags"
                    :key="tag"
                    size="x-small"
                    class="mr-1 mb-1"
                    color="primary"
                    variant="flat"
                >
                    {{ tag }}
                </v-chip>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn
                prepend-icon="mdi-open-in-new"
                variant="outlined"
                :disabled="project.status === 'end'"
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.v-card-actions {
    padding: 16px;
}
</style> 