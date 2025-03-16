import { defineStore } from 'pinia'

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
    state: () => ({
        items: [
            {
                id: '1',
                title: 'AI生成イメージ 1',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection1.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-01',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '2',
                title: 'AI生成イメージ 2',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection2.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-01',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '3',
                title: 'AI生成イメージ 3',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection3.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-01',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '4',
                title: 'AI生成イメージ 4',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection4.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-01',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '5',
                title: 'AI生成イメージ 5',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection5.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-01',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '6',
                title: 'AI生成イメージ 6',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection6.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-02',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '7',
                title: 'AI生成イメージ 7',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection7.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-02',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '8',
                title: 'AI生成イメージ 8',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection8.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-02',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '9',
                title: 'AI生成イメージ 9',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection9.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-02',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '10',
                title: 'AI生成イメージ 10',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection10.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-02',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '11',
                title: 'AI生成イメージ 11',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection11.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-03',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '12',
                title: 'AI生成イメージ 12',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection12.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-03',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '13',
                title: 'AI生成イメージ 13',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection13.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-03',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '14',
                title: 'AI生成イメージ 14',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection14.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-03',
                aiModel: 'DALL-E2' as const
            },
            {
                id: '15',
                title: 'AI生成イメージ 15',
                description: 'DALL-E2で生成したアート作品',
                imagePath: '/img/Gallery/GalleryCollection15.png',
                tags: ['アート', 'AI生成'],
                createdAt: '2024-03',
                aiModel: 'DALL-E2' as const
            }
        ] as GalleryItem[]
    }),
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