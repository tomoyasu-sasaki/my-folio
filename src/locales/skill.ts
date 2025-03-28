import type { TranslationDict, CategoryTranslationItem, BaseTranslationItem } from './types'

/**
 * スキル評価基準の翻訳アイテムの型定義
 */
interface SkillEvaluationTranslation {
  /** 経験レベルの説明 */
  experience: BaseTranslationItem;
  /** 好み度合いの説明 */
  preference: BaseTranslationItem;
}

/**
 * スキルカテゴリーの翻訳アイテムの型定義
 */
interface SkillCategoryTranslation {
  /** カテゴリー名の翻訳 */
  names: CategoryTranslationItem;
  /** カテゴリーの説明文 */
  descriptions: CategoryTranslationItem;
}

/**
 * スキルページ全体の翻訳アイテムの型定義
 */
interface SkillTranslation {
  /** 評価基準の説明 */
  evaluation: SkillEvaluationTranslation;
  /** カテゴリー情報 */
  categories: SkillCategoryTranslation;
}

/**
 * スキル翻訳データ
 */
export const skillTranslations: TranslationDict<SkillTranslation> = {
  ja: {
    evaluation: {
      experience: {
        text: '経験レベル',
        description: 'スキルの経験度合いを示す指標'
      },
      preference: {
        text: '好き度',
        description: 'スキルへの興味や好みの度合いを示す指標'
      }
    },
    categories: {
      names: {
        frontend: 'フロントエンド',
        backend: 'バックエンド',
        infrastructure: 'インフラストラクチャ',
        design: 'デザイン',
        management: 'プロジェクト管理',
        other: 'その他'
      },
      descriptions: {
        frontend: 'ユーザーインターフェースとインタラクションの開発',
        backend: 'サーバーサイドとデータベースの開発',
        infrastructure: 'クラウドとインフラストラクチャの構築・運用',
        design: 'UIデザインとユーザー体験の設計',
        management: 'プロジェクトとチームのマネジメント',
        other: 'その他の技術スキル'
      }
    }
  },
  en: {
    evaluation: {
      experience: {
        text: 'Experience Level',
        description: 'Indicator of skill experience level'
      },
      preference: {
        text: 'Preference Level',
        description: 'Indicator of interest and preference for the skill'
      }
    },
    categories: {
      names: {
        frontend: 'Frontend',
        backend: 'Backend',
        infrastructure: 'Infrastructure',
        design: 'Design',
        management: 'Project Management',
        other: 'Others'
      },
      descriptions: {
        frontend: 'User interface and interaction development',
        backend: 'Server-side and database development',
        infrastructure: 'Cloud and infrastructure setup and operation',
        design: 'UI design and user experience planning',
        management: 'Project and team management',
        other: 'Other technical skills'
      }
    }
  }
}; 