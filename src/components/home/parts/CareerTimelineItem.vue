<script setup lang="ts">
import type { CareerItem } from '../../../stores/career'
import { useLanguageStore } from '../../../stores/language'

// propsを直接分解して使用
const { item } = defineProps<{
    item: CareerItem
}>()

const languageStore = useLanguageStore()

const formatDate = (date: string) => {
    const [year, month] = date.split('/')
    const lang = languageStore.currentLanguage
    
    if (lang === 'ja') {
        return `${year}${languageStore.t('career', 'date', 'year')}${month}${languageStore.t('career', 'date', 'month')}`
    } else {
        // 英語の場合は "Month Year" 形式
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const monthIndex = parseInt(month) - 1
        return `${monthNames[monthIndex]} ${year}`
    }
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
            <v-card-item>
                <v-card-title class="text-h6 card-title">{{ item.title }}</v-card-title>
                <v-card-text>
                    <p class="mb-0 description-text">{{ item.description }}</p>
                </v-card-text>
            </v-card-item>
        </v-card>
    </v-timeline-item>
</template>

<style scoped>
.career-item {
    margin-bottom: 24px;
}

.date-section {
    min-width: 130px;
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
}

@media (max-width: 400px) {
    .date-section {
        min-width: 70px;
        margin-left: -12px;
    }

    .date-text {
        font-size: 0.875rem !important;
    }

    .subtitle-text {
        font-size: 0.75rem !important;
    }

}
</style> 