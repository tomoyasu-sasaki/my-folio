import type { TranslationDict } from './types';

interface LanguageSwitchTranslation {
  switchToOther: string;
  otherLanguage: string;
}

export const languageSwitchTranslations: TranslationDict<LanguageSwitchTranslation> = {
  ja: {
    switchToOther: 'EN',
    otherLanguage: 'English'
  },
  en: {
    switchToOther: '日本語',
    otherLanguage: '日本語'
  }
}; 