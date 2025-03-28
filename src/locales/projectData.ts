import type { TranslationDict, BaseTranslationItem } from './types'

/**
 * プロジェクトアイテムの翻訳アイテムの型定義
 */
interface ProjectItemTranslation extends BaseTranslationItem {
  /** プロジェクトのタイトル */
  title: string;
  /** プロジェクトのサブタイトル */
  subtitle: string;
  /** プロジェクトの説明 */
  description: string;
  /** プロジェクトの主な機能 */
  features?: string[];
  /** プロジェクトの使用技術 */
  techStack?: string[];
}

/**
 * プロジェクトデータ全体の翻訳アイテムの型定義
 */
interface ProjectDataTranslation {
  /** プロジェクトアイテム */
  items: {
    [key: `${number}`]: ProjectItemTranslation;
  };
}

/**
 * プロジェクトデータ翻訳データ
 */
export const projectDataTranslations: TranslationDict<ProjectDataTranslation> = {
  ja: {
    items: {
      '01': {
        text: 'GastronomeJourney',
        title: 'GastronomeJourney',
        subtitle: '行った居酒屋の記録用スマホアプリ',
        description: '訪れた居酒屋の情報や感想を記録・共有できるスマホアプリケーション',
        features: [
          '居酒屋情報の登録・管理',
          '画像投稿・管理機能',
          '公開/非公開設定',
          '検索・フィルタリング機能'
        ],
        techStack: [
          'React Native',
          'TypeScript',
          'Firebase',
          'Cloud Storage'
        ]
      },
      '02': {
        text: 'Blogfy',
        title: 'Blogfy',
        subtitle: '日記アプリ',
        description: 'マークダウン対応の日記作成・管理アプリケーション',
        features: [
          'マークダウン対応エディタ',
          'カテゴリ管理',
          'タグ検索機能',
          'ダークモード対応'
        ],
        techStack: [
          'Vue.js',
          'TypeScript',
          'Tailwind CSS',
          'Markdown-it'
        ]
      },
      '03': {
        text: 'TeamFlow',
        title: 'TeamFlow',
        subtitle: 'プロジェクト管理Webアプリ',
        description: 'チームのタスク管理とコミュニケーションを効率化するWebアプリ',
        features: [
          'タスク管理機能',
          'チーム間コミュニケーション',
          'スケジュールカレンダー',
          'パフォーマンス分析'
        ],
        techStack: [
          'Next.js',
          'TypeScript',
          'Prisma',
          'PostgreSQL'
        ]
      },
      '04': {
        text: 'CodeLearner',
        title: 'CodeLearner',
        subtitle: '勉強進捗管理Webアプリ',
        description: 'プログラミング学習の進捗を可視化・管理するWebアプリ',
        features: [
          'インタラクティブな学習体験',
          '進捗管理機能',
          'コード実行環境',
          'ソーシャルコーディング'
        ],
        techStack: [
          'Vue.js',
          'TypeScript',
          'Express',
          'MongoDB'
        ]
      },
      '05': {
        text: 'ConnectSphere',
        title: 'ConnectSphere',
        subtitle: 'Twitter風SNSWebアプリ',
        description: 'プログラマー向けのSNSプラットフォーム',
        features: [
          'リアルタイムメッセージング',
          'グループチャット',
          'メディア共有',
          'オンラインステータス管理'
        ],
        techStack: [
          'React',
          'TypeScript',
          'Socket.io',
          'Redis'
        ]
      }
    }
  },
  en: {
    items: {
      '01': {
        text: 'GastronomeJourney',
        title: 'GastronomeJourney',
        subtitle: 'Web app for recording visited izakayas',
        description: 'Web application that allows recording and sharing information and impressions of visited izakayas',
        features: [
          'Izakaya information registration and management',
          'Image upload and management',
          'Public/private settings',
          'Search and filtering functions'
        ],
        techStack: [
          'React Native',
          'TypeScript',
          'Firebase',
          'Cloud Storage'
        ]
      },
      '02': {
        text: 'Blogfy',
        title: 'Blogfy',
        subtitle: 'Diary app',
        description: 'Markdown-compatible diary creation and management application',
        features: [
          'Markdown editor',
          'Category management',
          'Tag search',
          'Dark mode support'
        ],
        techStack: [
          'Vue.js',
          'TypeScript',
          'Tailwind CSS',
          'Markdown-it'
        ]
      },
      '03': {
        text: 'TeamFlow',
        title: 'TeamFlow',
        subtitle: 'Project management web app',
        description: 'Web app that streamlines team task management and communication',
        features: [
          'Task management',
          'Team communication',
          'Schedule calendar',
          'Performance analysis'
        ],
        techStack: [
          'Next.js',
          'TypeScript',
          'Prisma',
          'PostgreSQL'
        ]
      },
      '04': {
        text: 'CodeLearner',
        title: 'CodeLearner',
        subtitle: 'Study progress management web app',
        description: 'Web app for visualizing and managing programming learning progress',
        features: [
          'Interactive learning experience',
          'Progress tracking',
          'Code execution environment',
          'Social coding'
        ],
        techStack: [
          'Vue.js',
          'TypeScript',
          'Express',
          'MongoDB'
        ]
      },
      '05': {
        text: 'ConnectSphere',
        title: 'ConnectSphere',
        subtitle: 'Twitter-like SNS web app',
        description: 'SNS platform for programmers',
        features: [
          'Real-time messaging',
          'Group chat',
          'Media sharing',
          'Online status management'
        ],
        techStack: [
          'React',
          'TypeScript',
          'Socket.io',
          'Redis'
        ]
      }
    }
  }
}; 