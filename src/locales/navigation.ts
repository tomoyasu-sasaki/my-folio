import type { TranslationDict, NavigationTranslationItem } from './types'

/**
 * ナビゲーション翻訳アイテムの型定義
 */
interface NavigationTranslation {
  home: NavigationTranslationItem;
  about: NavigationTranslationItem;
  skill: NavigationTranslationItem;
  career: NavigationTranslationItem;
  project: NavigationTranslationItem;
  gallery: NavigationTranslationItem;
}

/**
 * ナビゲーション翻訳データ
 */
export const navigationTranslations: TranslationDict<NavigationTranslation> = {
  ja: {
    home: {
      text: 'ホーム',
      ariaLabel: 'ホームページへ'
    },
    about: {
      text: '自己紹介',
      ariaLabel: '自己紹介ページへ'
    },
    skill: {
      text: 'スキル',
      ariaLabel: 'スキルページへ'
    },
    career: {
      text: '経歴',
      ariaLabel: '経歴ページへ'
    },
    project: {
      text: '成果物',
      ariaLabel: '成果物ページへ'
    },
    gallery: {
      text: 'ギャラリー',
      ariaLabel: 'ギャラリーページへ'
    }
  },
  en: {
    home: {
      text: 'Home',
      ariaLabel: 'Go to home page'
    },
    about: {
      text: 'About',
      ariaLabel: 'Go to about page'
    },
    skill: {
      text: 'Skills',
      ariaLabel: 'Go to skills page'
    },
    career: {
      text: 'Career',
      ariaLabel: 'Go to career page'
    },
    project: {
      text: 'Projects',
      ariaLabel: 'Go to projects page'
    },
    gallery: {
      text: 'Gallery',
      ariaLabel: 'Go to gallery page'
    }
  }
}; 