import { defineStore } from 'pinia'

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
    state: () => ({
        items: [
            {
                id: '01',
                date: '2000/07',
                title: '生まれる',
                subtitle: '埼玉県',
                description: '埼玉県で生まれる。当時のことはあまり記憶にない。',
                category: 'life' as const,
                icon: 'mdi-baby-face-outline',
                color: 'success'
            },
            {
                id: '02',
                date: '2016/04',
                title: '高校入学',
                subtitle: '特に思い出なし',
                description: 'バスケばっかりしてた。一度も勝ったことないけど練習はきつかったので一時期体脂肪率が10%未満になって驚いた。多分誤計測、あとは本ばっかり読んでいた。',
                category: 'education' as const,
                icon: 'mdi-school-outline',
                color: 'info'
            },
            {
                id: '03',
                date: '2019/03',
                title: '高校卒業',
                subtitle: 'いざ東京へ',
                description: '高校卒業して数日後に上京。日経新聞社の奨学生として、大田区の販売店に配属。早朝の仕事と学業の両立に挑戦。',
                category: 'education' as const,
                icon: 'mdi-school',
                color: 'info'
            },
            {
                id: '04',
                date: '2019/04',
                title: '専門学校入学',
                subtitle: '本格的な IT 学習開始',
                description: '日本工学院専門学校 情報処理科システム開発コースに入学。Java、C#などのプログラミング言語やデータベース、ネットワークの基礎を学ぶ。',
                category: 'education' as const,
                icon: 'mdi-code-braces',
                color: 'info'
            },
            {
                id: '05',
                date: '2021/03',
                title: '専門学校卒業',
                subtitle: 'いざ札幌へ',
                description: '日本工学院専門学校を無事卒業。同時に新聞奨学生としての活動も終了し、新たなステージへ。専門学生の期間の記憶がほどんどない。睡眠の重要性を実感する',
                category: 'education' as const,
                icon: 'mdi-school',
                color: 'info'
            },
            {
                id: '06',
                date: '2021/04',
                title: '第三者検証の企業に就職',
                subtitle: '札幌での新生活開始',
                description: '日本ナレッジ株式会社札幌支社に入社。基幹業務システムの仕様追加や検証業務を担当。品質管理の重要性とシステム開発の実務を学ぶ。',
                category: 'work' as const,
                icon: 'mdi-briefcase',
                color: 'primary'
            },
            {
                id: '07',
                date: '2022/09',
                title: '転職',
                subtitle: 'キャリアアップ',
                description: 'より幅広い経験を積むため株式会社エスプランニングへ転職。WEBアプリケーションのフロントエンド開発に従事。',
                category: 'work' as const,
                icon: 'mdi-briefcase-outline',
                color: 'primary'
            },

            {
                id: '08',
                date: '2024/07',
                title: '資格取得',
                subtitle: 'スキルアップ',
                description: 'AWSのCertified Cloud Practitionerを取得。AWSの基礎を学び、クラウド環境の理解を深める。',
                category: 'life' as const,
                icon: 'mdi-certificate',
                color: 'success'
            },
            {
                id: '09',
                date: '2025/03',
                title: 'ポートフォリオサイト作成',
                subtitle: '個人プロジェクト',
                description: '暇だったのでポートフォリオサイトを作成。Vue.jsとTypeScriptを使用。デザインセンスはない。',
                category: 'life' as const,
                icon: 'mdi-web',
                color: 'success'
            }
        ] as CareerItem[]
    }),
    getters: {
        getAllItems: (state) => state.items,
        getItemsByCategory: (state) => {
            return (category: CareerCategory) =>
                state.items.filter((item) => item.category === category)
        },
        getItemById: (state) => {
            return (id: string) => state.items.find((item) => item.id === id)
        }
    }
}) 