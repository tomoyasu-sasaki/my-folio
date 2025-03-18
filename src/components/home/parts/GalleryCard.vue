<script setup lang="ts">
import type { GalleryItem } from '../../../stores/gallery'
import { useLanguageStore } from '../../../stores/language'
import { ref } from 'vue'

defineProps<{
    item: GalleryItem
    mode?: 'grid' | 'carousel'
}>()

const dialog = ref(false)
const languageStore = useLanguageStore()

const aiModelColors = {
    'DALL-E2': 'info',
    'Midjourney': 'success',
    'Stable Diffusion': 'warning'
} as const
</script>

<template>
    <div class="gallery-card" :class="{ 'carousel-mode': mode === 'carousel' }">
        <!-- サムネイル表示 -->
        <v-img
            :src="item.imagePath"
            :alt="item.title"
            class="gallery-image"
            @click="dialog = true"
            :height="mode === 'carousel' ? '100%' : 280"
            :width="'100%'"
            :cover="mode === 'grid'"
            :contain="mode === 'carousel'"
            :class="{ 'carousel-image': mode === 'carousel' }"
        >
            <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary" />
                </v-row>
            </template>
            <!-- オーバーレイ情報（グリッドモード時のみ） -->
            <template v-if="mode === 'grid'" v-slot:default>
                <div class="image-overlay">
                    <div class="overlay-content">
                        <v-chip :color="aiModelColors[item.aiModel]" size="small" class="mb-2">
                            {{ item.aiModel }}
                        </v-chip>
                        <div class="text-subtitle-2 font-weight-bold">{{ item.title }}</div>
                        <div class="text-caption">{{ item.createdAt }}</div>
                    </div>
                </div>
            </template>
        </v-img>

        <!-- 詳細ダイアログ -->
        <v-dialog v-model="dialog" max-width="90vw" class="gallery-dialog">
            <v-card>
                <v-img
                    :src="item.imagePath"
                    :max-height="'80vh'"
                    contain
                    class="dialog-image"
                />
                <v-card-title class="d-flex align-center">
                    {{ item.title }}
                    <v-chip :color="aiModelColors[item.aiModel]" size="small" class="ml-2">
                        {{ item.aiModel }}
                    </v-chip>
                </v-card-title>
                <v-card-subtitle>{{ item.createdAt }}</v-card-subtitle>
                <v-card-text>
                    <p>{{ item.description }}</p>
                    <div class="mt-2">
                        <v-chip
                            v-for="tag in item.tags"
                            :key="tag"
                            size="x-small"
                            class="mr-1 mb-1"
                            variant="outlined"
                        >
                            {{ tag }}
                        </v-chip>
                    </div>
                    <p v-if="item.prompt" class="mt-2 text-caption">
                        {{ languageStore.t('gallery', 'prompt') }}: {{ item.prompt }}
                    </p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" variant="text" @click="dialog = false">
                        {{ languageStore.t('gallery', 'close') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.gallery-card {
    position: relative;
    cursor: pointer;
    transition: transform 0.2s ease;
    height: 100%;
}

.gallery-card:not(.carousel-mode):hover {
    transform: scale(1.02);
}

.gallery-image {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.carousel-image {
    height: 600px !important;
    border-radius: 0;
    box-shadow: none;
    background-color: rgba(0, 0, 0, 0.03);
}

.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 8px;
    display: flex;
    align-items: flex-end;
    padding: 16px;
}

.gallery-card:hover .image-overlay {
    opacity: 1;
}

.overlay-content {
    color: white;
    width: 100%;
}

.carousel-mode .gallery-image {
    border-radius: 0;
    box-shadow: none;
}

.gallery-dialog {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dialog-image {
    background-color: rgba(0, 0, 0, 0.9);
}

@media (max-width: 600px) {
    .gallery-image:not(.carousel-image) {
        height: 200px !important;
    }
    
    .carousel-image {
        height: 400px !important;
    }
}
</style> 