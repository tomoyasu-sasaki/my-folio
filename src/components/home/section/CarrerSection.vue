<script setup lang="ts">
import { useCareerStore } from '@/stores/career'
import { useLanguageStore } from '@/stores/language'
import type { CareerCategory } from '@/stores/career'
import CareerTimelineItem from '../parts/CareerTimelineItem.vue'
import { computed, ref } from 'vue'

const careerStore = useCareerStore()
const languageStore = useLanguageStore()
const items = computed(() => careerStore.getAllItems)

// カテゴリーフィルター
const selectedCategory = ref<CareerCategory | null>(null)

// カテゴリー一覧
const categories = [
    { value: null, label: 'all', icon: 'mdi-view-list' },
    { value: 'education', label: 'education', icon: 'mdi-school' },
    { value: 'work', label: 'work', icon: 'mdi-briefcase' },
    { value: 'life', label: 'life', icon: 'mdi-account-heart' }
] as const

// フィルター適用後のアイテム
const filteredItems = computed(() => {
    if (!selectedCategory.value) return items.value
    return careerStore.getItemsByCategory(selectedCategory.value)
})
</script>

<template>
    <v-container id="careerContainer" class="padding">
        <!-- フィルターセクション -->
        <v-row class="mb-8">
            <v-col cols="12" class="d-flex justify-center">
                <v-btn-toggle
                    v-model="selectedCategory"
                    mandatory
                    color="primary"
                    class="career-filter"
                >
                    <v-btn
                        v-for="category in categories"
                        :key="category.value || 'all'"
                        :value="category.value"
                        variant="text"
                        class="filter-btn"
                    >
                        <v-icon :icon="category.icon" class="mr-1" />
                        <span class="btn-text">{{ languageStore.t('career', 'categories', category.label) }}</span>
                    </v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>

        <!-- タイムライン -->
        <v-timeline 
            side="end" 
            truncate-line="start" 
            class="career-timeline"
            density="comfortable"
            align="start"
        >
            <CareerTimelineItem
                v-for="item in filteredItems"
                :key="item.id"
                :item="item"
            />
        </v-timeline>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}

.career-filter {
    border-radius: 8px;
    overflow: hidden;
    max-width: 100%;
}

.career-timeline {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 16px;
    width: 100%;
}

.filter-btn {
    min-width: 100px;
    padding: 0 16px;
}

@media (max-width: 600px) {
    .padding {
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .career-filter {
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        gap: 8px;
        background-color: transparent;
    }

    .filter-btn {
        min-width: calc(50% - 4px);
        margin: 0 !important;
        border-radius: 4px;
    }

    .btn-text {
        font-size: 0.875rem;
    }

    .career-timeline {
        padding: 0;
        margin: 0;
        width: 100%;
    }

    :deep(.v-timeline) {
        width: 100%;
        padding-left: 8px;
        padding-right: 8px;
    }
}

@media (max-width: 400px) {
    .filter-btn {
        min-width: 100%;
    }

    .career-timeline {
        padding: 0;
    }

    :deep(.v-timeline) {
        padding-left: 4px;
        padding-right: 4px;
    }
}
</style>
