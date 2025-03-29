import { defineStore } from 'pinia'
import type { Language } from '../../locales/types'

// 基本的なキャリアデータの型定義
export interface CareerData {
    id: string
    date: string
    category: CareerCategory
    icon?: string
    color?: string
}

// キャリアの翻訳データの型定義
export interface CareerTranslation {
    languageId: Language
    careerId: string
    title: string
    subtitle?: string
    description: string
}

// キャリアカテゴリーの型定義
export type CareerCategory = 'education' | 'work' | 'life'

// ストアの状態の型定義
interface CareerState {
    items: Record<string, CareerData>
    translations: Record<string, CareerTranslation>
    itemIds: string[]
}

export const useNormalizedCareerStore = defineStore('normalizedCareer', {
    state: (): CareerState => ({
        items: {},
        translations: {},
        itemIds: []
    }),

    getters: {
        // 全てのキャリアアイテムのIDを取得
        getAllItemIds: (state): string[] => state.itemIds,

        // カテゴリー別のキャリアアイテムIDを取得
        getItemIdsByCategory: (state) => (category: CareerCategory): string[] => {
            return state.itemIds.filter(id => state.items[id]?.category === category)
        },

        // キャリアアイテムの翻訳を取得
        getItemTranslation: (state) => (itemId: string, languageId: Language): CareerTranslation | undefined => {
            const translationId = `${itemId}-${languageId}`
            return state.translations[translationId]
        }
    },

    actions: {
        // キャリアアイテムを追加
        addItem(item: CareerData): void {
            this.items[item.id] = item
            if (!this.itemIds.includes(item.id)) {
                this.itemIds.push(item.id)
            }
        },

        // キャリアアイテムの翻訳を追加
        addTranslation(translation: CareerTranslation): void {
            const translationId = `${translation.careerId}-${translation.languageId}`
            this.translations[translationId] = translation
        },

        // ストアの初期化
        initialize(): void {
            // キャリアアイテムの初期化
            const initialItems: CareerData[] = [
                {
                    id: '01',
                    date: '2000/07',
                    category: 'life',
                    icon: 'mdi-baby-face-outline',
                    color: 'success'
                },
                {
                    id: '03',
                    date: '2019/03',
                    category: 'education',
                    icon: 'mdi-school',
                    color: 'info'
                },
                {
                    id: '04',
                    date: '2019/04',
                    category: 'education',
                    icon: 'mdi-code-braces',
                    color: 'info'
                },
                {
                    id: '05',
                    date: '2021/03',
                    category: 'education',
                    icon: 'mdi-school',
                    color: 'info'
                },
                {
                    id: '06',
                    date: '2021/04',
                    category: 'work',
                    icon: 'mdi-briefcase',
                    color: 'primary'
                },
                {
                    id: '07',
                    date: '2022/09',
                    category: 'work',
                    icon: 'mdi-briefcase-outline',
                    color: 'primary'
                },
                {
                    id: '08',
                    date: '2024/07',
                    category: 'life',
                    icon: 'mdi-certificate',
                    color: 'success'
                },
                {
                    id: '09',
                    date: '2025/03',
                    category: 'life',
                    icon: 'mdi-web',
                    color: 'success'
                }
            ]

            // 各アイテムをストアに追加
            initialItems.forEach(item => this.addItem(item))

            // 翻訳データの初期化
            const initialTranslations: CareerTranslation[] = [
                // 日本語の翻訳
                {
                    languageId: 'ja',
                    careerId: '01',
                    title: '生まれる',
                    description: '埼玉県で生まれる'
                },
                {
                    languageId: 'ja',
                    careerId: '03',
                    title: '高校卒業',
                    subtitle: 'いざ東京へ',
                    description: '高校卒業の数日後に上京。日経新聞社社寮という名の大田区にあるボロボロの販売店に配属'
                },
                {
                    languageId: 'ja',
                    careerId: '04',
                    title: '専門学校入学',
                    subtitle: '日本工学院専門学校',
                    description: '日本工学院専門学校の情報処理科システム開発コースに入学'
                },
                {
                    languageId: 'ja',
                    careerId: '05',
                    title: '専門学校卒業',
                    subtitle: 'いざ札幌へ',
                    description: '日本工学院専門学校の情報処理科システム開発コースを卒業し同時期に新聞奨学生も卒業'
                },
                {
                    languageId: 'ja',
                    careerId: '06',
                    title: '第三者検証の企業に就職',
                    subtitle: '就職を機に札幌へ北上',
                    description: '日本ナレッジ株式会社札幌支社に就職。基幹業務システムの仕様追加等の業務に従事'
                },
                {
                    languageId: 'ja',
                    careerId: '07',
                    title: '転職',
                    subtitle: '他の会社へ転職',
                    description: 'さまざまな案件を経験するために株式会社エスプランニングへ転職'
                },
                {
                    languageId: 'ja',
                    careerId: '08',
                    title: 'フリーランス',
                    subtitle: '独立',
                    description: 'フリーランスとして活動開始'
                },
                {
                    languageId: 'ja',
                    careerId: '09',
                    title: 'ポートフォリオサイト作成',
                    subtitle: '技術力向上',
                    description: 'Vue.js、TypeScript、BabylonJSなどの技術を使用してポートフォリオサイトを作成'
                },
                // 英語の翻訳
                {
                    languageId: 'en',
                    careerId: '01',
                    title: 'Born',
                    description: 'Born in Saitama Prefecture'
                },
                {
                    languageId: 'en',
                    careerId: '03',
                    title: 'High School Graduation',
                    subtitle: 'Moving to Tokyo',
                    description: 'Moved to Tokyo after graduating from high school. Assigned to a newspaper sales office in Ota Ward'
                },
                {
                    languageId: 'en',
                    careerId: '04',
                    title: 'Enrolled in Technical School',
                    subtitle: 'Nippon Engineering College',
                    description: 'Enrolled in Information Processing Department, System Development Course at Nippon Engineering College'
                },
                {
                    languageId: 'en',
                    careerId: '05',
                    title: 'Technical School Graduation',
                    subtitle: 'Moving to Sapporo',
                    description: 'Graduated from Information Processing Department, System Development Course at Nippon Engineering College'
                },
                {
                    languageId: 'en',
                    careerId: '06',
                    title: 'Joined Third-Party Verification Company',
                    subtitle: 'Relocated to Sapporo for work',
                    description: 'Joined Nippon Knowledge Co., Ltd. Sapporo Branch. Engaged in core business system specification additions'
                },
                {
                    languageId: 'en',
                    careerId: '07',
                    title: 'Career Change',
                    subtitle: 'New Company',
                    description: 'Changed jobs to S Planning Co., Ltd. to gain experience in various projects'
                },
                {
                    languageId: 'en',
                    careerId: '08',
                    title: 'Freelance',
                    subtitle: 'Independence',
                    description: 'Started working as a freelance developer'
                },
                {
                    languageId: 'en',
                    careerId: '09',
                    title: 'Portfolio Website Creation',
                    subtitle: 'Technical Growth',
                    description: 'Created a portfolio website using Vue.js, TypeScript, BabylonJS, and other technologies'
                }
            ]

            // 各翻訳をストアに追加
            initialTranslations.forEach(translation => this.addTranslation(translation))
        }
    }
}) 