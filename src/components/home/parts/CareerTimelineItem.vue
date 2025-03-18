<script setup lang="ts">
import type { CareerItem } from '@/stores/career'

defineProps<{
    item: CareerItem
}>()

const formatDate = (date: string) => {
    const [year, month] = date.split('/')
    return `${year}年${month}月`
}
</script>

<template>
    <v-timeline-item
        :dot-color="item.color"
        :icon="item.icon"
        size="small"
        class="career-item"
    >
        <template v-slot:opposite>
            <div class="date-section">
                <div class="text-h6 date-text">{{ formatDate(item.date) }}</div>
                <div v-if="item.subtitle" class="text-subtitle-2 subtitle-text">
                    {{ item.subtitle }}
                </div>
            </div>
        </template>

        <v-card class="career-card" variant="outlined" :color="item.color">
            <v-card-title class="text-h6 card-title">{{ item.title }}</v-card-title>
            <v-card-text>
                <p class="mb-0 description-text">{{ item.description }}</p>
            </v-card-text>
        </v-card>
    </v-timeline-item>
</template>

<style scoped>
.career-item {
    margin-bottom: 24px;
}

.date-section {
    min-width: 130px;
    padding-right: 16px;
}

.career-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    max-width: 600px;
    width: 100%;
}

.career-card:hover {
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1) !important;
}

@media (max-width: 600px) {
    .date-section {
        min-width: 90px;
        padding-right: 8px;
    }

    .date-text {
        font-size: 1rem !important;
        line-height: 1.2;
    }

    .subtitle-text {
        font-size: 0.8rem !important;
        line-height: 1.2;
    }

    .card-title {
        font-size: 1rem !important;
        line-height: 1.4;
        word-break: break-word;
    }

    .description-text {
        font-size: 0.875rem;
        line-height: 1.4;
        word-break: break-word;
        white-space: pre-wrap;
    }

    .career-card {
        margin-left: -10px;
        max-width: calc(100vw - 140px);
    }
}

@media (max-width: 400px) {
    .date-section {
        min-width: 70px;
    }

    .date-text {
        font-size: 0.875rem !important;
    }

    .subtitle-text {
        font-size: 0.75rem !important;
    }

    .career-card {
        max-width: calc(100vw - 120px);
    }
}
</style> 