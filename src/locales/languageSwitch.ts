import type { TranslationDict, BaseTranslationItem } from './types';

/**
 * 言語切り替え翻訳アイテムの型定義
 */
interface LanguageSwitchTranslation {
  /** 言語切り替えボタン関連 */
  button: {
    /** 他の言語に切り替えるボタン */
    switchLanguage: BaseTranslationItem;
    /** 切り替え先の言語名 */
    targetLanguage: BaseTranslationItem;
    /** 他の言語に切り替えるボタン */
    switchToOther: BaseTranslationItem;
  };
  /** 言語切り替えオプション */
  switchOption: BaseTranslationItem;
  /** 他の言語 */
  otherLanguage: BaseTranslationItem;
  /** 詳細情報 */
  details: BaseTranslationItem;
}

export const languageSwitchTranslations: TranslationDict<LanguageSwitchTranslation> = {
  ja: {
    button: {
      switchLanguage: {
        text: 'EN',
        description: '英語に切り替え'
      },
      targetLanguage: {
        text: 'English',
        description: '英語の表示名'
      },
      switchToOther: {
        text: '言語を切り替える',
        description: '他の言語に切り替え'
      }
    },
    switchOption: {
      text: '言語を切り替える',
      description: '言語切り替えオプション'
    },
    otherLanguage: {
      text: 'English',
      description: '他の言語の表示名'
    },
    details: {
      text: '詳細',
      description: '詳細情報'
    }
  },
  en: {
    button: {
      switchLanguage: {
        text: '日本語',
        description: 'Switch to Japanese'
      },
      targetLanguage: {
        text: '日本語',
        description: 'Japanese language name'
      },
      switchToOther: {
        text: 'Switch Language',
        description: 'Switch to other language'
      }
    },
    switchOption: {
      text: 'Switch Language',
      description: 'Language switch option'
    },
    otherLanguage: {
      text: '日本語',
      description: 'Other language name'
    },
    details: {
      text: 'Details',
      description: 'Detailed information'
    }
  }
}; 