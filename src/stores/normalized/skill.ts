import { defineStore } from 'pinia'

// 正規化されたスキルの型定義
export interface NormalizedSkill {
  id: string
  name: string
  categoryId: string
}

// 正規化されたスキルカテゴリーの型定義
export interface NormalizedSkillCategory {
  id: string
  key: SkillCategory
}

// 正規化されたスキル評価の型定義
export interface NormalizedSkillEvaluation {
  skillId: string
  level: number
  likes: number
}

// スキルカテゴリーの型定義
export type SkillCategory = 'frontend' | 'backend' | 'database' | 'infrastructure'

// ストアの状態の型定義
interface SkillState {
  skills: Record<string, NormalizedSkill>
  categories: Record<string, NormalizedSkillCategory>
  evaluations: Record<string, NormalizedSkillEvaluation>
  skillIds: string[]
  categoryIds: string[]
}

export const useNormalizedSkillStore = defineStore('normalizedSkill', {
  state: (): SkillState => ({
    skills: {},
    categories: {},
    evaluations: {},
    skillIds: [],
    categoryIds: []
  }),

  getters: {
    // カテゴリー別のスキルIDを取得
    getSkillIdsByCategory: (state) => (categoryId: string): string[] => {
      return state.skillIds.filter(id => state.skills[id]?.categoryId === categoryId)
    },

    // スキルの評価データを取得
    getSkillEvaluation: (state) => (skillId: string): NormalizedSkillEvaluation | undefined => {
      return state.evaluations[skillId]
    },

    // カテゴリーの翻訳キーを取得
    getCategoryKey: (state) => (categoryId: string): SkillCategory | undefined => {
      return state.categories[categoryId]?.key
    }
  },

  actions: {
    // ストアの初期化
    initialize() {
      // カテゴリーの初期化
      const categories: SkillCategory[] = ['frontend', 'backend', 'database', 'infrastructure']
      categories.forEach((key, index) => {
        const id = `category-${index + 1}`
        this.categories[id] = {
          id,
          key
        }
        this.categoryIds.push(id)
      })

      // スキルデータの初期化
      const skillsData = [
        // フロントエンド
        { name: 'Vue.js', level: 50, likes: 80, category: this.categoryIds[0] },
        { name: 'React', level: 20, likes: 20, category: this.categoryIds[0] },
        { name: 'HTML/CSS', level: 80, likes: 80, category: this.categoryIds[0] },
        { name: 'Nuxt.js', level: 20, likes: 30, category: this.categoryIds[0] },

        // バックエンド
        { name: 'Node.js', level: 10, likes: 20, category: this.categoryIds[1] },
        { name: 'Python(Django)', level: 10, likes: 20, category: this.categoryIds[1] },

        // データベース
        { name: 'MySQL', level: 10, likes: 20, category: this.categoryIds[2] },
        { name: 'SQLite', level: 20, likes: 20, category: this.categoryIds[2] },
        { name: 'SQL Server', level: 30, likes: 20, category: this.categoryIds[2] },
        { name: 'Supabase', level: 10, likes: 10, category: this.categoryIds[2] },

        // インフラストラクチャ
        { name: 'AWS', level: 10, likes: 20, category: this.categoryIds[3] },
        { name: 'Firebase', level: 20, likes: 20, category: this.categoryIds[3] },
        { name: 'GCP', level: 0, likes: 0, category: this.categoryIds[3] },
      ]

      // スキルとその評価データを登録
      skillsData.forEach((data, index) => {
        const id = `skill-${index + 1}`
        
        // スキルの登録
        this.skills[id] = {
          id,
          name: data.name,
          categoryId: data.category
        }
        this.skillIds.push(id)

        // 評価データの登録
        this.evaluations[id] = {
          skillId: id,
          level: data.level,
          likes: data.likes
        }
      })
    }
  }
}) 