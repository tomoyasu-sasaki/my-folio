import { computed } from 'vue'
import { useNormalizedCareerStore } from '../stores/normalized/career'
import { useLanguageStore } from '../stores/language'
import type { CareerData, CareerCategory } from '../stores/normalized/career'
import type { ComputedRef } from 'vue'

// キャリアアイテムと翻訳を含むインターフェース
export interface CareerItemWithTranslation extends CareerData {
    title: string
    subtitle?: string
    description: string
}

// コンポーザブルの戻り値の型定義
interface UseCareerDataReturn {
    initialize: () => void
    allItems: ComputedRef<CareerItemWithTranslation[]>
    getItemsByCategory: (category: CareerCategory) => CareerItemWithTranslation[]
}

export function useCareerData(): UseCareerDataReturn {
    const careerStore = useNormalizedCareerStore()
    const languageStore = useLanguageStore()

    // 全てのキャリアアイテムを取得（翻訳付き）
    const allItems = computed<CareerItemWithTranslation[]>(() => {
        return careerStore.getAllItemIds.map(id => {
            const item = careerStore.items[id]
            const translation = careerStore.getItemTranslation(id, languageStore.currentLanguage)
            
            if (!item || !translation) {
                throw new Error(`キャリアアイテムまたは翻訳が見つかりません: ${id}`)
            }

            return {
                ...item,
                title: translation.title,
                subtitle: translation.subtitle,
                description: translation.description
            }
        })
    })

    // カテゴリー別のキャリアアイテムを取得
    const getItemsByCategory = (category: CareerCategory): CareerItemWithTranslation[] => {
        const itemIds = careerStore.getItemIdsByCategory(category)
        return itemIds.map(id => {
            const item = careerStore.items[id]
            const translation = careerStore.getItemTranslation(id, languageStore.currentLanguage)
            
            if (!item || !translation) {
                throw new Error(`キャリアアイテムまたは翻訳が見つかりません: ${id}`)
            }

            return {
                ...item,
                title: translation.title,
                subtitle: translation.subtitle,
                description: translation.description
            }
        })
    }

    // ストアの初期化
    const initialize = (): void => {
        careerStore.initialize()
    }

    return {
        initialize,
        allItems,
        getItemsByCategory
    }
} 