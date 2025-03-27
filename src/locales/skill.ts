import type { TranslationDict } from './types';

interface SkillCategoriesTranslation {
  frontend: string;
  backend: string;
  database: string;
  aws: string;
}

interface SkillDescriptionsTranslation {
  frontend: string;
  backend: string;
  database: string;
  aws: string;
}

interface SkillTranslation {
  experienceLevel: string;
  likeLevel: string;
  categories: SkillCategoriesTranslation;
  descriptions: SkillDescriptionsTranslation;
}

export const skillTranslations: TranslationDict<SkillTranslation> = {
  ja: {
    experienceLevel: '経験レベル',
    likeLevel: '好き度',
    categories: {
      frontend: 'フロントエンドスキル',
      backend: 'バックエンドスキル',
      database: 'データベーススキル',
      aws: 'AWSサービススキル'
    },
    descriptions: {
      frontend: 'Web開発のフロントエンド技術',
      backend: 'サーバーサイド開発技術',
      database: 'データベース関連技術',
      aws: 'AWSクラウドサービス'
    }
  },
  en: {
    experienceLevel: 'Experience Level',
    likeLevel: 'Interest Level',
    categories: {
      frontend: 'Frontend Skills',
      backend: 'Backend Skills',
      database: 'Database Skills',
      aws: 'AWS Services'
    },
    descriptions: {
      frontend: 'Frontend technologies for web development',
      backend: 'Server-side development technologies',
      database: 'Database related technologies',
      aws: 'AWS cloud services'
    }
  }
}; 