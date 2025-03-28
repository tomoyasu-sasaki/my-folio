import { defineStore } from 'pinia'
import type { Language } from '../../locales/types'

// 基本的なギャラリーデータの型定義
export interface GalleryData {
    id: string
    imagePath: string
    tags: string[]
    createdAt: string
    aiModel: 'DALL-E2' | 'Midjourney' | 'Stable Diffusion'
    prompt?: string
}

// ギャラリーアイテムの翻訳データの型定義
export interface GalleryTranslation {
    id: string
    languageId: Language
    title: string
    description: string
}

// ストアの状態の型定義
interface GalleryState {
    items: Record<string, GalleryData>
    translations: Record<string, Record<Language, GalleryTranslation>>
    itemIds: string[]
}

// ギャラリーストアの定義
export const useNormalizedGalleryStore = defineStore('normalizedGallery', {
    state: (): GalleryState => ({
        items: {},
        translations: {},
        itemIds: []
    }),

    actions: {
        // ギャラリーアイテムの追加
        addItem(item: GalleryData): void {
            this.items[item.id] = item
            if (!this.itemIds.includes(item.id)) {
                this.itemIds.push(item.id)
            }
        },

        // ギャラリーアイテムの翻訳の追加
        addTranslation(translation: GalleryTranslation): void {
            if (!this.translations[translation.id]) {
                this.translations[translation.id] = {} as Record<Language, GalleryTranslation>
            }
            this.translations[translation.id][translation.languageId] = translation
        },

        // ギャラリーアイテムの更新
        updateItem(id: string, updates: Partial<GalleryData>): void {
            if (this.items[id]) {
                this.items[id] = { ...this.items[id], ...updates }
            }
        },

        // ギャラリーアイテムの翻訳の更新
        updateTranslation(id: string, languageId: Language, updates: Partial<GalleryTranslation>): void {
            if (this.translations[id]?.[languageId]) {
                this.translations[id][languageId] = {
                    ...this.translations[id][languageId],
                    ...updates
                }
            }
        },

        // ストアの初期化
        initialize(): void {
            // 初期データの設定
            const galleryItems: GalleryData[] = Array.from({ length: 15 }, (_, i) => ({
                id: String(i + 1),
                imagePath: `/my-folio/img/Gallery/GalleryCollection${i + 1}.png`,
                tags: ['アート', 'AI生成'],
                createdAt: i < 5 ? '2024-01' : i < 10 ? '2024-02' : '2024-03',
                aiModel: 'DALL-E2'
            }))

            // アイテムの登録
            galleryItems.forEach(item => {
                this.addItem(item)
            })
        }
    },

    getters: {
        // 全てのギャラリーアイテムを取得
        getAllItems: (state): GalleryData[] => {
            return state.itemIds.map(id => state.items[id])
        },

        // 月別のギャラリーアイテムを取得
        getItemsByMonth: (state) => (month: string): GalleryData[] => {
            return state.itemIds
                .map(id => state.items[id])
                .filter(item => item.createdAt === month)
        },

        // IDによるギャラリーアイテムの取得
        getItemById: (state) => (id: string): GalleryData | undefined => {
            return state.items[id]
        },

        // ギャラリーアイテムの翻訳を取得
        getTranslation: (state) => (id: string, languageId: Language): GalleryTranslation | undefined => {
            return state.translations[id]?.[languageId]
        }
    }
}) 