import { defineStore } from 'pinia'

// スキルの型定義
export interface Skill {
    name: string
    level: number
    likes: number
    category: SkillCategory
}

// スキルカテゴリーの型定義
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'aws'

// カテゴリー情報の型定義
export interface CategoryInfo {
    id: SkillCategory
    title: string
    description: string
}

export const useSkillStore = defineStore({
    id: 'skill',
    state: () => ({
        categories: [
            {
                id: 'frontend' as const,
                title: 'フロントエンドスキル',
                description: 'Web開発のフロントエンド技術'
            },
            {
                id: 'backend' as const,
                title: 'バックエンドスキル',
                description: 'サーバーサイド開発技術'
            },
            {
                id: 'database' as const,
                title: 'データベーススキル',
                description: 'データベース関連技術'
            },
            {
                id: 'aws' as const,
                title: 'AWSサービススキル',
                description: 'AWSクラウドサービス'
            }
        ] as CategoryInfo[],
        skills: [
            // フロントエンド
            { name: 'Vue.js', level: 50, likes: 80, category: 'frontend' },
            { name: 'React', level: 20, likes: 20, category: 'frontend' },
            { name: 'HTML/CSS', level: 80, likes: 80, category: 'frontend' },
            { name: 'Nuxt.js', level: 20, likes: 30, category: 'frontend' },
            // { name: 'PHP', level: 10, likes: -20, category: 'frontend' },

            // バックエンド
            { name: 'Node.js', level: 10, likes: 20, category: 'backend' },
            { name: 'Python(Django)', level: 10, likes: 20, category: 'backend' },
            // { name: 'Ruby', level: 0, likes: 0, category: 'backend' },
            // { name: 'PHP', level: 0, likes: 0, category: 'backend' },
            // { name: 'C#', level: 0, likes: 0, category: 'backend' },

            // データベース
            { name: 'MySQL', level: 10, likes: 20, category: 'database' },
            { name: 'SQLite', level: 20, likes: 20, category: 'database' },
            { name: 'SQL Server', level: 30, likes: 20, category: 'database' },
            { name: 'Supabase', level: 10, likes: 10, category: 'database' },
            // { name: 'Oracle', level: 0, likes: 0, category: 'database' },

            // AWS
            { name: 'EC2', level: 0, likes: 0, category: 'aws' },
            { name: 'S3', level: 0, likes: 0, category: 'aws' },
            { name: 'Lambda', level: 0, likes: 0, category: 'aws' },
            { name: 'CloudFront', level: 0, likes: 0, category: 'aws' }
        ] as Skill[]
    }),
    getters: {
        getSkillsByCategory: (state) => {
            return (category: SkillCategory) =>
                state.skills.filter((skill) => skill.category === category)
        },
        getCategoryInfo: (state) => {
            return (categoryId: SkillCategory) =>
                state.categories.find((category) => category.id === categoryId)
        }
    }
}) 