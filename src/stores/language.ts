import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Language } from '../locales/types'
import { 
  aboutTranslations,
  careerTranslations,
  contactTranslations,
  galleryDataTranslations,
  navigationTranslations,
  projectDataTranslations,
  skillTranslations,
  languageSwitchTranslations,
  galleryTranslations,
  projectTranslations,
  projectDetailTranslations,
  commonTranslations
} from '../locales'

// 言語設定を管理するストア
export const useLanguageStore = defineStore('language', () => {
    // 現在の言語（初期値は日本語）
    const currentLanguage = ref<Language>('ja')
    
    // 言語を切り替える関数
    const toggleLanguage = () => {
        currentLanguage.value = currentLanguage.value === 'ja' ? 'en' : 'ja'
    }
    
    // 特定のキーに対応する翻訳テキストを取得する関数
    const t = (section: string, key: string, subKey?: string, itemId?: string): string => {
        const lang = currentLanguage.value
        
        switch (section) {
            case 'navigation':
                if (key in navigationTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    const item = navigationTranslations[lang][key]
                    if (item && typeof item === 'object' && subKey && subKey in item) {
                        // @ts-ignore - 動的アクセスのため
                        return item[subKey]
                    }
                    if (typeof item === 'object' && 'text' in item) {
                        return item.text
                    }
                    return String(item)
                }
                break
                
            case 'project':
                if (key === 'status' && subKey && subKey in projectTranslations[lang].status) {
                    // @ts-ignore - 動的アクセスのため
                    return projectTranslations[lang].status[subKey]
                }
                if (key in projectTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return projectTranslations[lang][key]
                }
                break
                
            case 'gallery':
                if (key in galleryTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return galleryTranslations[lang][key]
                }
                break
                
            case 'about':
                if (key in aboutTranslations[lang]) {
                    if (subKey && itemId) {
                        // @ts-ignore - 動的アクセスのため
                        const nestedValue = aboutTranslations[lang][key][subKey]?.[itemId]
                        return nestedValue ? String(nestedValue) : itemId
                    } else if (subKey) {
                        // @ts-ignore - 動的アクセスのため
                        const nestedValue = aboutTranslations[lang][key][subKey]
                        return nestedValue ? String(nestedValue) : subKey
                    }
                    // @ts-ignore - 動的アクセスのため
                    return String(aboutTranslations[lang][key])
                }
                break
                
            case 'skill':
                if (key === 'categories' && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = skillTranslations[lang].categories[subKey]
                    return value ? String(value) : subKey
                }
                if (key === 'descriptions' && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = skillTranslations[lang].descriptions[subKey]
                    return value ? String(value) : subKey
                }
                if (key in skillTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return String(skillTranslations[lang][key])
                }
                break
                
            case 'career':
                if (key === 'categories' && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = careerTranslations[lang].categories[subKey]
                    return value ? String(value) : subKey
                }
                if (key === 'date' && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = careerTranslations[lang][key]?.[subKey]
                    return value ? String(value) : subKey
                }
                if (key === 'items' && itemId && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = careerTranslations[lang].items[itemId]?.[subKey]
                    return value ? String(value) : subKey
                }
                break
                
            case 'languageSwitch':
                if (key in languageSwitchTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return String(languageSwitchTranslations[lang][key])
                }
                break
                
            case 'projectData':
                if (itemId && key) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDataTranslations[lang][itemId]?.[key]
                    return value ? String(value) : key
                }
                break
                
            case 'galleryData':
                if (key === 'common' && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = galleryDataTranslations[lang].common[subKey]
                    return value ? String(value) : subKey
                }
                if (key === 'items' && itemId && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = galleryDataTranslations[lang].items[itemId]?.[subKey]
                    return value ? String(value) : subKey
                }
                break
                
            case 'contact':
                if ((key === 'form' || key === 'social') && subKey) {
                    // @ts-ignore - 動的アクセスのため
                    const value = contactTranslations[lang][key][subKey]
                    return value ? String(value) : subKey
                }
                break
                
            case 'projectDetail':
                if (key === 'sectionTitles' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].sectionTitles[itemId]
                    return value ? String(value) : itemId
                }
                if (key === 'customContent' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].customContent[itemId]
                    return value ? String(value) : itemId
                }
                if (key === 'testimonials' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].testimonials[itemId]
                    return value ? String(value) : itemId
                }
                if (key === 'screen' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].screen[itemId]
                    return value ? String(value) : itemId
                }
                if (key === 'type' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].type[itemId]
                    return value ? String(value) : itemId
                }
                if (key === 'feature' && itemId) {
                    // @ts-ignore - 動的アクセスのため
                    const value = projectDetailTranslations[lang].feature[itemId]
                    return value ? String(value) : itemId
                }
                if (key in projectDetailTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return String(projectDetailTranslations[lang][key])
                }
                break
                
            case 'common':
                if (key in commonTranslations[lang]) {
                    // @ts-ignore - 動的アクセスのため
                    return String(commonTranslations[lang][key])
                }
                break
        }
        
        return key
    }
    
    return {
        currentLanguage,
        toggleLanguage,
        t
    }
}, {
    persist: true
}) 