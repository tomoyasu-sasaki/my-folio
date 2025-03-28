import { computed, type ComputedRef } from 'vue'
import { useLanguageStore } from '../stores/language'
import type { Language, SectionName } from '../locales/types'

export interface TranslationProps {
  section: SectionName
  key: string
  subKey?: string
  itemId?: string
}

interface TranslationComposable {
  t: (props: TranslationProps) => string
  currentLanguage: ComputedRef<Language>
  toggleLanguage: () => void
}

/**
 * 翻訳機能を提供するコンポーザブル
 * @returns 翻訳関連の機能を提供するオブジェクト
 */
export function useTranslation(): TranslationComposable {
  const languageStore = useLanguageStore()
  
  /**
   * 翻訳テキストを取得する関数
   * @param props 翻訳プロパティ
   * @returns 翻訳されたテキスト
   */
  const t = (props: TranslationProps): string => {
    return languageStore.t(props.section, props.key, props.subKey, props.itemId)
  }

  /**
   * 現在の言語を取得するcomputed
   */
  const currentLanguage = computed<Language>(() => languageStore.currentLanguage)

  /**
   * 言語を切り替える関数
   */
  const toggleLanguage = (): void => {
    languageStore.toggleLanguage()
  }

  return {
    t,
    currentLanguage,
    toggleLanguage
  }
} 