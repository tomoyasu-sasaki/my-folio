import { computed } from 'vue'
import { useNormalizedGalleryStore } from '../stores/normalized/gallery'
import { useTranslation } from './useTranslation'
import type { GalleryData } from '../stores/normalized/gallery'
import type { SectionName } from '../locales/types'
import type { ComputedRef } from 'vue'

// ギャラリーアイテムの型定義（翻訳を含む）
export interface GalleryItemWithTranslation extends GalleryData {
    title: string
    description: string
}

export function useGalleryData(): {
    initialize: () => void
    allItems: ComputedRef<GalleryItemWithTranslation[]>
    getItemsByMonth: (month: string) => GalleryItemWithTranslation[]
} {
    const galleryStore = useNormalizedGalleryStore()
    const { t } = useTranslation()

    // アイテムの翻訳を取得する関数
    const getItemTranslation = (id: string, key: string): string => {
        const section: SectionName = 'galleryData'
        return t({ section, key: 'items', subKey: id, itemId: key })
    }

    // 共通の翻訳を取得する関数
    const getCommonTranslation = (key: string): string => {
        const section: SectionName = 'galleryData'
        return t({ section, key: 'common', subKey: key })
    }

    // 翻訳付きのアイテムを構築する関数
    const buildItemWithTranslation = (item: GalleryData): GalleryItemWithTranslation => {
        return {
            ...item,
            title: getItemTranslation(item.id, 'title'),
            description: getCommonTranslation('description')
        }
    }

    // 全てのアイテムを取得
    const allItems = computed<GalleryItemWithTranslation[]>(() => 
        galleryStore.getAllItems.map(buildItemWithTranslation)
    )

    // 月別のアイテムを取得
    const getItemsByMonth = (month: string): GalleryItemWithTranslation[] => {
        return galleryStore.getItemsByMonth(month).map(buildItemWithTranslation)
    }

    // ストアの初期化
    const initialize = (): void => {
        galleryStore.initialize()
    }

    return {
        initialize,
        allItems,
        getItemsByMonth
    }
} 