import { defineStore } from 'pinia'
import { useLanguageStore } from './language'

// 経歴アイテムの型定義
export interface CareerItem {
    id: string
    date: string
    title: string
    subtitle?: string
    description: string
    category: CareerCategory
    icon?: string
    color?: string
}

// 経歴カテゴリーの型定義
export type CareerCategory = 'education' | 'work' | 'life'

export const useCareerStore = defineStore({
    id: 'career',
    state: () => {
        // 言語ストアを取得
        const languageStore = useLanguageStore()

        // 翻訳対応した経歴アイテムを生成する関数
        const createCareerItem = (
            id: string,
            date: string,
            category: CareerCategory,
            icon?: string,
            color?: string
        ): CareerItem => {
            return {
                id,
                date,
                category,
                icon,
                color,
                get title(): string {
                    return languageStore.t('career', 'items', id, 'title') as string
                },
                get subtitle(): string {
                    return languageStore.t('career', 'items', id, 'subtitle') as string
                },
                get description(): string {
                    return languageStore.t('career', 'items', id, 'description') as string
                }
            }
        }

        return {
            items: [
                createCareerItem(
                    '01',
                    '2000/07',
                    'life',
                    'mdi-baby-face-outline',
                    'success'
                ),
                createCareerItem(
                    '03',
                    '2019/03',
                    'education',
                    'mdi-school',
                    'info'
                ),
                createCareerItem(
                    '04',
                    '2019/04',
                    'education',
                    'mdi-code-braces',
                    'info'
                ),
                createCareerItem(
                    '05',
                    '2021/03',
                    'education',
                    'mdi-school',
                    'info'
                ),
                createCareerItem(
                    '06',
                    '2021/04',
                    'work',
                    'mdi-briefcase',
                    'primary'
                ),
                createCareerItem(
                    '07',
                    '2022/09',
                    'work',
                    'mdi-briefcase-outline',
                    'primary'
                ),
                createCareerItem(
                    '08',
                    '2024/07',
                    'life',
                    'mdi-certificate',
                    'success'
                ),
                createCareerItem(
                    '09',
                    '2025/03',
                    'life',
                    'mdi-web',
                    'success'
                )
            ] as CareerItem[]
        }
    },
    getters: {
        getAllItems: (state) => state.items,
        getItemsByCategory: (state): (category: CareerCategory) => CareerItem[] => {
            return (category: CareerCategory): CareerItem[] =>
                state.items.filter((item) => item.category === category)
        },
        getItemById: (state): (id: string) => CareerItem | undefined => {
            return (id: string): CareerItem | undefined =>
                state.items.find((item) => item.id === id)
        }
    }
}) 