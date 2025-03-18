<script setup lang="ts">
import type { Project } from '@/stores/project'

defineProps<{
    project: Project
}>()

const statusColors = {
    completed: 'success',
    'in-progress': 'info',
    planned: 'warning',
    end: 'error'
} as const

const statusLabels = {
    completed: '完了',
    'in-progress': '開発中',
    planned: '計画中',
    end: '終了'
} as const

function openOtherService(url: string) {
    if (url) {
        window.open(url, '_blank')
    }
}
</script>

<template>
    <v-card class="project-card" variant="outlined" elevation="2">
        <v-img
            :src="`/img/Project/${project.image}`"
            height="200"
            width="200"
            cover
            class="project-image"
        />

        <v-card-title class="d-flex align-center">
            {{ project.title }}
            <v-chip
                :color="statusColors[project.status]"
                size="small"
                class="ml-2"
                label
            >
                {{ statusLabels[project.status] }}
            </v-chip>
        </v-card-title>

        <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>

        <v-card-text v-if="project.description">
            {{ project.description }}
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
                :disabled="!project.url"
                @click="openOtherService(project.url)"
                prepend-icon="mdi-open-in-new"
            >
                詳細
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