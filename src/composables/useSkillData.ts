import { computed } from 'vue'
import { useNormalizedSkillStore } from '../stores/normalized/skill'
import { useTranslation } from './useTranslation'
import type { NormalizedSkill, NormalizedSkillEvaluation, SkillCategory } from '../stores/normalized/skill'
import type { SectionName } from '../locales/types'
import type { ComputedRef } from 'vue'

// スキルデータの型定義
export interface SkillData {
  id: string
  name: string
  level: number
  likes: number
  category: SkillCategory
}

// カテゴリースキルの型定義
export interface CategorySkillData {
  categoryId: string
  title: string
  skills: SkillData[]
}

export function useSkillData(): {
  initialize: () => void
  categorySkills: ComputedRef<CategorySkillData[]>
  getSkillsByCategory: (categoryId: string) => SkillData[]
} {
  const skillStore = useNormalizedSkillStore()
  const { t } = useTranslation()

  // カテゴリー名の翻訳を取得
  const getCategoryTranslation = (category: SkillCategory): string => {
    const section: SectionName = 'skill'
    return t({ section, key: 'categories', subKey: 'names', itemId: category })
  }

  // スキルデータを構築
  const buildSkillData = (
    skill: NormalizedSkill,
    evaluation: NormalizedSkillEvaluation,
    categoryKey: SkillCategory
  ): SkillData => {
    return {
      id: skill.id,
      name: skill.name,
      level: evaluation.level,
      likes: evaluation.likes,
      category: categoryKey
    }
  }

  // カテゴリー別のスキルデータを取得
  const getSkillsByCategory = (categoryId: string): SkillData[] => {
    const skillIds = skillStore.getSkillIdsByCategory(categoryId)
    const categoryKey = skillStore.getCategoryKey(categoryId)
    if (!categoryKey) return []

    return skillIds
      .map(id => {
        const skill = skillStore.skills[id]
        const evaluation = skillStore.getSkillEvaluation(id)
        if (!skill || !evaluation) return null

        return buildSkillData(skill, evaluation, categoryKey)
      })
      .filter((skill): skill is SkillData => skill !== null)
  }

  // カテゴリー別のスキルデータを計算
  const categorySkills = computed<CategorySkillData[]>(() => 
    skillStore.categoryIds.map(categoryId => {
      const categoryKey = skillStore.getCategoryKey(categoryId)
      if (!categoryKey) return null

      return {
        categoryId,
        title: getCategoryTranslation(categoryKey),
        skills: getSkillsByCategory(categoryId)
      }
    }).filter((data): data is CategorySkillData => data !== null)
  )

  // ストアの初期化
  const initialize = (): void => {
    skillStore.initialize()
  }

  return {
    initialize,
    categorySkills,
    getSkillsByCategory
  }
} 