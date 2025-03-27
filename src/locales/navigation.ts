import type { TranslationDict } from './types';

interface NavigationItemTranslation {
  text: string;
  ariaLabel: string;
}

interface NavigationTranslation {
  home: NavigationItemTranslation;
  about: NavigationItemTranslation;
  skill: NavigationItemTranslation;
  career: NavigationItemTranslation;
  project: NavigationItemTranslation;
  gallery: NavigationItemTranslation;
  contact: NavigationItemTranslation;
}

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
    },
    contact: {
      text: 'お問い合わせ',
      ariaLabel: 'お問い合わせページへ'
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
    },
    contact: {
      text: 'Contact',
      ariaLabel: 'Go to contact page'
    }
  }
}; 