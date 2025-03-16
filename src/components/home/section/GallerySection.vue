<script setup lang="ts">
import { useGalleryStore } from '@/stores/gallery'
import GalleryCard from '../parts/GalleryCard.vue'
import { computed, ref } from 'vue'

const galleryStore = useGalleryStore()
const items = computed(() => galleryStore.getAllItems)

// 表示モード
const displayMode = ref<'grid' | 'carousel'>('grid')

// 月別フィルター用の一意な月リスト
const uniqueMonths = computed(() => {
    const months = new Set(items.value.map((item) => item.createdAt))
    return Array.from(months).sort().reverse()
})

// 選択された月
const selectedMonth = ref<string | null>(null)

// フィルター適用後のアイテム
const filteredItems = computed(() => {
    if (!selectedMonth.value) return items.value
    return galleryStore.getItemsByMonth(selectedMonth.value)
})
</script>

<template>
    <v-container id="GallerySection" class="padding">
        <!-- ヘッダー部分 -->
        <v-row class="mb-4">
            <v-col cols="12" sm="6" class="d-flex align-center">
                <v-chip-group>
                    <v-chip
                        variant="outlined"
                        size="large"
                        :color="!selectedMonth ? 'primary' : undefined"
                        @click="selectedMonth = null"
                    >
                        すべて
                    </v-chip>
                    <v-chip
                        v-for="month in uniqueMonths"
                        :key="month"
                        variant="outlined"
                        size="large"
                        :color="selectedMonth === month ? 'primary' : undefined"
                        @click="selectedMonth = month"
                    >
                        {{ month }}
                    </v-chip>
                </v-chip-group>
            </v-col>
            <v-col cols="12" sm="6" class="d-flex justify-end align-center">
                <v-btn-toggle v-model="displayMode" mandatory variant="outlined">
                    <v-btn value="grid" icon="mdi-grid"  />
                    <v-btn value="carousel" icon="mdi-view-carousel"  />
                </v-btn-toggle>
            </v-col>
        </v-row>

        <div class="gallery-container">
            <!-- グリッド表示 -->
            <v-row v-if="displayMode === 'grid'" class="gallery-grid">
                <v-col
                    v-for="item in filteredItems"
                    :key="item.id"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                    class="gallery-item"
                >
                    <GalleryCard :item="item" mode="grid" />
                </v-col>
            </v-row>

            <!-- カルーセル表示 -->
            <div v-else class="carousel-container">
                <v-carousel
                    hide-delimiters
                    show-arrows="hover"
                    height="600"
                    class="gallery-carousel"
                    cycle
                    interval="8000"
                >
                    <v-carousel-item
                        v-for="item in filteredItems"
                        :key="item.id"
                        class="carousel-item"
                    >
                        <GalleryCard :item="item" mode="carousel" />
                    </v-carousel-item>
                </v-carousel>
            </div>
        </div>
    </v-container>
</template>

<style scoped>
.padding {
    padding-top: 100px;
    padding-bottom: 100px;
}

.gallery-container {
    position: relative;
    min-height: 400px;
}

.gallery-grid {
    margin: 0 -8px;
}

.gallery-item {
    padding: 8px;
    height: 100%;
}

.carousel-container {
    position: relative;
    width: 100%;
    height: 600px;
}

.gallery-carousel {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.03);
}

.gallery-carousel :deep(.v-carousel__controls) {
    background: rgba(0, 0, 0, 0.3);
}

.carousel-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}

@media (max-width: 600px) {
    .padding {
        padding-top: 60px;
        padding-bottom: 60px;
    }

    .carousel-container {
        height: 400px;
    }

    .gallery-carousel {
        height: 400px !important;
    }
}
</style>
