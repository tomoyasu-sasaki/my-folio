import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

// ギャラリーアイテムの型定義
export interface GalleryItem {
    id: string
    title: string
    description?: string
    imagePath: string
    tags: string[]
    createdAt: string
    prompt?: string
    aiModel: 'DALL-E2' | 'Midjourney' | 'Stable Diffusion'
}

export const useGalleryStore = defineStore({
    id: 'gallery',
    state: () => {
        // 言語ストアを取得
        const languageStore = useLanguageStore()

        // 翻訳対応したギャラリーアイテムを生成する関数
        const createGalleryItem = (
            id: string,
            imagePath: string,
            tags: string[],
            createdAt: string,
            aiModel: 'DALL-E2' | 'Midjourney' | 'Stable Diffusion',
            prompt?: string
        ): GalleryItem => {
            return {
                id,
                imagePath,
                tags,
                createdAt,
                aiModel,
                prompt,
                get title() {
                    return languageStore.t('galleryData', 'items', 'title', id) as string
                },
                get description() {
                    return languageStore.t('galleryData', 'common', 'description') as string
                }
            }
        }

        return {
            items: [
                createGalleryItem(
                    '1',
                    '/img/Gallery/GalleryCollection1.png',
                    ['アート', 'AI生成'],
                    '2024-01',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '2',
                    '/img/Gallery/GalleryCollection2.png',
                    ['アート', 'AI生成'],
                    '2024-01',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '3',
                    '/img/Gallery/GalleryCollection3.png',
                    ['アート', 'AI生成'],
                    '2024-01',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '4',
                    '/img/Gallery/GalleryCollection4.png',
                    ['アート', 'AI生成'],
                    '2024-01',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '5',
                    '/img/Gallery/GalleryCollection5.png',
                    ['アート', 'AI生成'],
                    '2024-01',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '6',
                    '/img/Gallery/GalleryCollection6.png',
                    ['アート', 'AI生成'],
                    '2024-02',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '7',
                    '/img/Gallery/GalleryCollection7.png',
                    ['アート', 'AI生成'],
                    '2024-02',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '8',
                    '/img/Gallery/GalleryCollection8.png',
                    ['アート', 'AI生成'],
                    '2024-02',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '9',
                    '/img/Gallery/GalleryCollection9.png',
                    ['アート', 'AI生成'],
                    '2024-02',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '10',
                    '/img/Gallery/GalleryCollection10.png',
                    ['アート', 'AI生成'],
                    '2024-02',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '11',
                    '/img/Gallery/GalleryCollection11.png',
                    ['アート', 'AI生成'],
                    '2024-03',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '12',
                    '/img/Gallery/GalleryCollection12.png',
                    ['アート', 'AI生成'],
                    '2024-03',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '13',
                    '/img/Gallery/GalleryCollection13.png',
                    ['アート', 'AI生成'],
                    '2024-03',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '14',
                    '/img/Gallery/GalleryCollection14.png',
                    ['アート', 'AI生成'],
                    '2024-03',
                    'DALL-E2'
                ),
                createGalleryItem(
                    '15',
                    '/img/Gallery/GalleryCollection15.png',
                    ['アート', 'AI生成'],
                    '2024-03',
                    'DALL-E2'
                )
            ] as GalleryItem[]
        }
    },
    getters: {
        getAllItems: (state) => state.items,
        getItemsByMonth: (state) => {
            return (month: string) =>
                state.items.filter((item) => item.createdAt === month)
        },
        getItemById: (state) => {
            return (id: string) => state.items.find((item) => item.id === id)
        }
    }
}) 