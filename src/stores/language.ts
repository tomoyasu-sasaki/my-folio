import { defineStore } from 'pinia'
import { ref } from 'vue'
import { logger } from '../utils/logger'
import type { 
  Language, 
  SectionName, 
  TranslationFunction,
  TranslationError,
  BaseTranslationItem,
  TranslationDict,
  BaseTranslationDict,
  NestedTranslationItem,
} from '../locales/types'
import { 
  aboutTranslations,
  careerTranslations,
  galleryDataTranslations,
  navigationTranslations,
  projectDataTranslations,
  skillTranslations,
  languageSwitchTranslations,
  galleryTranslations,
  projectTranslations,
  projectDetailTranslations,
  commonTranslations,
} from '../locales'

// 翻訳データのマッピング
const translationMap = {
  navigation: navigationTranslations,
  project: projectTranslations,
  gallery: galleryTranslations,
  about: aboutTranslations,
  skill: skillTranslations,
  career: careerTranslations,
  languageSwitch: languageSwitchTranslations,
  projectData: projectDataTranslations,
  galleryData: galleryDataTranslations,
  projectDetail: projectDetailTranslations,
  common: commonTranslations,
} as unknown as Record<SectionName, TranslationDict<BaseTranslationDict>>;

// エラーメッセージの定義
const errors: Record<string, TranslationError> = {
  SECTION_NOT_FOUND: {
    code: 'SECTION_NOT_FOUND',
    message: '指定されたセクションが見つかりません'
  },
  KEY_NOT_FOUND: {
    code: 'KEY_NOT_FOUND',
    message: '指定されたキーが見つかりません'
  }
} as const;

// 言語設定を管理するストア
export const useLanguageStore = defineStore('language', () => {
  // 現在の言語（初期値は日本語）
  const currentLanguage = ref<Language>('ja')
    
  // 言語を切り替える関数
  const toggleLanguage = (): void => {
    currentLanguage.value = currentLanguage.value === 'ja' ? 'en' : 'ja'
  }

  // 翻訳値を取得する関数
  const getTranslationValue = (
    translations: BaseTranslationDict,
    key: string,
    subKey?: string,
    itemId?: string
  ): string => {
    try {
      if (itemId && key && subKey) {
        const item = translations[key] as NestedTranslationItem | undefined
        const subItem = item?.[subKey] as NestedTranslationItem | undefined
        const value = subItem?.[itemId]
        if (typeof value === 'object' && value !== null && 'text' in value) {
          return (value as BaseTranslationItem).text
        }
        return value ? String(value) : itemId
      }
      
      if (key === 'categories' && subKey) {
        const categories = translations.categories as NestedTranslationItem | undefined
        const value = categories?.[subKey]
        if (typeof value === 'object' && value !== null && 'name' in value) {
          const nameValue = value.name as BaseTranslationItem
          return nameValue.text
        }
        return value ? String(value) : subKey
      }
      
      if (subKey) {
        const item = translations[key] as NestedTranslationItem | undefined
        const value = item?.[subKey]
        if (typeof value === 'object' && value !== null && 'text' in value) {
          return (value as BaseTranslationItem).text
        }
        return value ? String(value) : subKey
      }
      
      if (key in translations) {
        const value = translations[key]
        if (typeof value === 'object' && value !== null && 'text' in value) {
          return (value as BaseTranslationItem).text
        }
        return String(value)
      }
      
      throw { ...errors.KEY_NOT_FOUND, key }
    } catch (error) {
      logger.error('Translation value retrieval error', { key, subKey, itemId }, error as TranslationError)
      return key
    }
  }
    
  // 特定のキーに対応する翻訳テキストを取得する関数
  const t: TranslationFunction = (section, key, subKey?, itemId?) => {
    const lang = currentLanguage.value
    
    try {
      // セクションの存在確認
      if (!(section in translationMap)) {
        throw { ...errors.SECTION_NOT_FOUND, section }
      }
      
      // 翻訳データの取得
      const translations = translationMap[section][lang]
      
      // 翻訳値の取得
      return getTranslationValue(translations, key, subKey, itemId)
    } catch (error) {
      const err = error as TranslationError
      logger.error('Translation error', { section, key, subKey, itemId, lang }, err)
      return key
    }
  }
    
  return {
    currentLanguage,
    toggleLanguage,
    t
  }
}, {
  persist: true
}) 