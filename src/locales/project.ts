import type { TranslationDict, BaseTranslationItem } from './types'

/**
 * プロジェクトセクションの翻訳アイテムの型定義
 */
interface ProjectSectionTranslation {
  /** セクションのタイトル */
  title: BaseTranslationItem;
  /** セクションの説明 */
  description: BaseTranslationItem;
}

/**
 * プロジェクトステータスの翻訳アイテムの型定義
 */
interface ProjectStatusTranslation {
  /** 完了 */
  completed: BaseTranslationItem;
  /** 開発中 */
  'in-progress': BaseTranslationItem;
  /** 計画中 */
  planned: BaseTranslationItem;
  /** 終了 */
  end: BaseTranslationItem;
}

/**
 * プロジェクトアクションの翻訳アイテムの型定義
 */
interface ProjectActionTranslation {
  /** 詳細ボタン */
  details: BaseTranslationItem;
  /** サイト訪問ボタン */
  visit: BaseTranslationItem;
}

/**
 * プロジェクトページ全体の翻訳アイテムの型定義
 */
interface ProjectTranslation {
  /** セクション情報 */
  section: ProjectSectionTranslation;
  /** ステータス情報 */
  status: ProjectStatusTranslation;
  /** アクション情報 */
  action: ProjectActionTranslation;
}

/**
 * プロジェクト翻訳データ
 */
export const projectTranslations: TranslationDict<ProjectTranslation> = {
  ja: {
    section: {
      title: {
        text: 'プロジェクト',
        description: '私が開発したプロジェクトの一覧'
      },
      description: {
        text: '個人やチームで開発したプロジェクトを紹介します',
        description: 'プロジェクト一覧の概要説明'
      }
    },
    status: {
      completed: {
        text: '完了',
        description: 'プロジェクトが完了した状態'
      },
      'in-progress': {
        text: '開発中',
        description: '現在開発中の状態'
      },
      planned: {
        text: '計画中',
        description: '計画段階の状態'
      },
      end: {
        text: '終了',
        description: 'プロジェクトが終了した状態'
      }
    },
    action: {
      details: {
        text: '詳細',
        description: 'プロジェクトの詳細を表示'
      },
      visit: {
        text: 'サイトを訪問',
        description: 'プロジェクトのWebサイトを開く'
      }
    }
  },
  en: {
    section: {
      title: {
        text: 'Projects',
        description: 'List of projects I have developed'
      },
      description: {
        text: 'Showcasing projects developed individually and in teams',
        description: 'Overview of project list'
      }
    },
    status: {
      completed: {
        text: 'Completed',
        description: 'Project is completed'
      },
      'in-progress': {
        text: 'In Progress',
        description: 'Currently under development'
      },
      planned: {
        text: 'Planned',
        description: 'In planning stage'
      },
      end: {
        text: 'Ended',
        description: 'Project has ended'
      }
    },
    action: {
      details: {
        text: 'Details',
        description: 'View project details'
      },
      visit: {
        text: 'Visit Website',
        description: 'Open project website'
      }
    }
  }
}; 