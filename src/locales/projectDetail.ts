import type { TranslationDict, BaseTranslationItem } from './types'

/**
 * プロジェクト詳細のセクションタイトルの翻訳アイテムの型定義
 */
interface ProjectDetailSectionTranslation {
  /** 主要機能セクション */
  'core-features': BaseTranslationItem;
  /** スクリーンショットセクション */
  'screenshots': BaseTranslationItem;
  /** アーキテクチャセクション */
  'architecture': BaseTranslationItem;
  /** デモ動画セクション */
  'demo-video': BaseTranslationItem;
  /** 技術スタックセクション */
  'technology': BaseTranslationItem;
  /** ユーザーフィードバックセクション */
  'user-feedback': BaseTranslationItem;
}

/**
 * プロジェクト詳細のカスタムコンテンツの翻訳アイテムの型定義
 */
interface ProjectDetailCustomContentTranslation {
  /** アーキテクチャの説明 */
  'architecture-description': BaseTranslationItem;
}

/**
 * プロジェクト詳細のユーザーフィードバックの翻訳アイテムの型定義
 */
interface ProjectDetailTestimonialTranslation {
  /** フィードバック1 */
  'testimonial-1': BaseTranslationItem;
  /** フィードバック2 */
  'testimonial-2': BaseTranslationItem;
  /** フィードバック3 */
  'testimonial-3': BaseTranslationItem;
}

/**
 * プロジェクト詳細のスクリーンショットの翻訳アイテムの型定義
 */
interface ProjectDetailScreenTranslation {
  [key: `${number}-${number}`]: BaseTranslationItem;
}

/**
 * プロジェクト詳細のプロジェクトタイプの翻訳アイテムの型定義
 */
interface ProjectDetailTypeTranslation {
  [key: `${number}`]: BaseTranslationItem;
}

/**
 * プロジェクト詳細の機能の翻訳アイテムの型定義
 */
interface ProjectDetailFeatureTranslation {
  [key: `${number}-${number}`]: BaseTranslationItem;
}

/**
 * プロジェクト詳細の基本情報の翻訳アイテムの型定義
 */
interface ProjectDetailBasicInfoTranslation {
  /** 説明 */
  description: BaseTranslationItem;
  /** 主な機能 */
  features: BaseTranslationItem;
  /** 使用技術 */
  techStack: BaseTranslationItem;
  /** 概要 */
  overview: BaseTranslationItem;
  /** 開発言語 */
  language: BaseTranslationItem;
  /** プロジェクトタイプ */
  projectType: BaseTranslationItem;
  /** リンク */
  link: BaseTranslationItem;
  /** モックアップ */
  mockups: BaseTranslationItem;
}

/**
 * プロジェクト詳細のボタンの翻訳アイテムの型定義
 */
interface ProjectDetailButtonTranslation {
  /** デモボタン */
  demoButton: BaseTranslationItem;
  /** GitHubボタン */
  githubButton: BaseTranslationItem;
  /** ダウンロードボタン */
  downloadButton: BaseTranslationItem;
  /** 公式サイトボタン */
  officialButton: BaseTranslationItem;
}

/**
 * プロジェクト詳細全体の翻訳アイテムの型定義
 */
interface ProjectDetailTranslation {
  /** 基本情報 */
  basicInfo: ProjectDetailBasicInfoTranslation;
  /** ボタン */
  buttons: ProjectDetailButtonTranslation;
  /** セクションタイトル */
  sections: ProjectDetailSectionTranslation;
  /** カスタムコンテンツ */
  customContent: ProjectDetailCustomContentTranslation;
  /** ユーザーフィードバック */
  testimonials: ProjectDetailTestimonialTranslation;
  /** スクリーンショット */
  screen: ProjectDetailScreenTranslation;
  /** プロジェクトタイプ */
  type: ProjectDetailTypeTranslation;
  /** 機能 */
  feature: ProjectDetailFeatureTranslation;
}

/**
 * プロジェクト詳細翻訳データ
 */
export const projectDetailTranslations: TranslationDict<ProjectDetailTranslation> = {
  ja: {
    basicInfo: {
      description: {
        text: '説明',
        description: 'プロジェクトの説明'
      },
      features: {
        text: '主な機能',
        description: 'プロジェクトの主要機能一覧'
      },
      techStack: {
        text: '使用技術',
        description: 'プロジェクトで使用した技術スタック'
      },
      overview: {
        text: '概要',
        description: 'プロジェクトの概要説明'
      },
      language: {
        text: '開発言語',
        description: 'プロジェクトで使用したプログラミング言語'
      },
      projectType: {
        text: 'プロジェクトタイプ',
        description: 'プロジェクトの種類'
      },
      link: {
        text: 'リンク',
        description: '関連リンク'
      },
      mockups: {
        text: 'モックアップ',
        description: 'プロジェクトのモックアップ画像'
      }
    },
    buttons: {
      demoButton: {
        text: 'デモを見る',
        description: 'デモページを開く'
      },
      officialButton: {
        text: '公式サイト',
        description: '公式サイトを開く'
      },
      githubButton: {
        text: 'GitHubで見る',
        description: 'GitHubリポジトリを開く'
      },
      downloadButton: {
        text: 'ダウンロード',
        description: 'プロジェクトをダウンロード'
      }
    },
    sections: {
      'core-features': {
        text: '主要機能',
        description: 'プロジェクトの主要機能一覧'
      },
      'screenshots': {
        text: 'スクリーンショット',
        description: 'プロジェクトのスクリーンショット'
      },
      'architecture': {
        text: 'アーキテクチャ',
        description: 'プロジェクトのアーキテクチャ説明'
      },
      'demo-video': {
        text: 'デモ動画',
        description: 'プロジェクトのデモ動画'
      },
      'technology': {
        text: '使用技術',
        description: 'プロジェクトで使用した技術'
      },
      'user-feedback': {
        text: 'ユーザーの声',
        description: 'ユーザーからのフィードバック'
      }
    },
    customContent: {
      'architecture-description': {
        text: 'このアプリはFirebaseをバックエンドに、Vue.jsをフロントエンドに使用しています。データはFirestoreに保存され、画像はCloud Storageに保存されます。認証はFirebase Authenticationを使用しています。',
        description: 'アプリケーションのアーキテクチャ概要'
      }
    },
    testimonials: {
      'testimonial-1': {
        text: '「このアプリは私の日々の学習を管理するのに非常に役立っています。以前より進捗を把握しやすくなりました。」',
        description: '学習管理に関するフィードバック'
      },
      'testimonial-2': {
        text: '「インターフェースが直感的で使いやすいです。コードの実行環境が特に気に入っています。」',
        description: 'ユーザーインターフェースに関するフィードバック'
      },
      'testimonial-3': {
        text: '「友達と一緒に勉強するときに便利です。お互いの進捗を確認できるのが良いですね。」',
        description: '共同学習に関するフィードバック'
      }
    },
    screen: {
      '01-1': {
        text: 'ホーム画面',
        description: 'アプリケーションのホーム画面'
      },
      '01-2': {
        text: '登録画面',
        description: 'ユーザー登録画面'
      },
      '01-3': {
        text: '詳細画面',
        description: '詳細情報表示画面'
      },
      '01-4': {
        text: '検索画面',
        description: '検索機能画面'
      },
      '01-5': {
        text: 'プロフィール画面',
        description: 'ユーザープロフィール画面'
      },
      '02-1': {
        text: 'エディタ画面',
        description: 'テキストエディタ画面'
      },
      '02-2': {
        text: '一覧画面',
        description: 'アイテム一覧画面'
      },
      '02-3': {
        text: '設定画面',
        description: 'アプリケーション設定画面'
      },
      '03-1': {
        text: 'ダッシュボード',
        description: 'プロジェクトダッシュボード'
      },
      '03-2': {
        text: 'タスク管理',
        description: 'タスク管理画面'
      },
      '03-3': {
        text: 'チームチャット',
        description: 'チームコミュニケーション画面'
      },
      '03-4': {
        text: 'カレンダー',
        description: 'スケジュール管理画面'
      },
      '04-1': {
        text: 'コース一覧',
        description: '学習コース一覧画面'
      },
      '04-2': {
        text: '学習画面',
        description: 'プログラミング学習画面'
      },
      '04-3': {
        text: '進捗確認',
        description: '学習進捗確認画面'
      },
      '05-1': {
        text: 'フィード',
        description: 'SNSフィード画面'
      },
      '05-2': {
        text: 'メッセージ',
        description: 'メッセージング画面'
      },
      '05-3': {
        text: 'グループ',
        description: 'グループ管理画面'
      }
    },
    type: {
      '01': {
        text: 'モバイルアプリ',
        description: 'スマートフォン向けアプリケーション'
      },
      '02': {
        text: 'Webアプリ',
        description: 'ブラウザで動作するアプリケーション'
      },
      '03': {
        text: 'Webアプリ',
        description: 'ブラウザで動作するアプリケーション'
      },
      '04': {
        text: 'Webアプリ',
        description: 'ブラウザで動作するアプリケーション'
      },
      '05': {
        text: 'モバイルアプリ',
        description: 'スマートフォン向けアプリケーション'
      }
    },
    feature: {
      '01-1': {
        text: '居酒屋情報の登録・管理',
        description: '訪れた居酒屋の情報を登録・管理する機能'
      },
      '01-2': {
        text: '画像投稿・管理機能',
        description: '店舗や料理の画像を投稿・管理する機能'
      },
      '01-3': {
        text: '公開/非公開設定',
        description: '投稿情報の公開範囲を設定する機能'
      },
      '01-4': {
        text: '検索・フィルタリング機能',
        description: '店舗情報を検索・フィルタリングする機能'
      },
      '02-1': {
        text: 'マークダウン対応エディタ',
        description: 'マークダウン形式でテキストを編集する機能'
      },
      '02-2': {
        text: 'カテゴリ管理',
        description: '記事をカテゴリで分類・管理する機能'
      },
      '02-3': {
        text: 'タグ検索機能',
        description: 'タグを使って記事を検索する機能'
      },
      '02-4': {
        text: 'ダークモード対応',
        description: 'ダークモードに対応したUI'
      },
      '03-1': {
        text: 'タスク管理機能',
        description: 'プロジェクトのタスクを管理する機能'
      },
      '03-2': {
        text: 'チーム間コミュニケーション',
        description: 'チームメンバー間でコミュニケーションを取る機能'
      },
      '03-3': {
        text: 'スケジュールカレンダー',
        description: 'プロジェクトのスケジュールを管理する機能'
      },
      '03-4': {
        text: 'パフォーマンス分析',
        description: 'プロジェクトの進捗やパフォーマンスを分析する機能'
      },
      '04-1': {
        text: 'インタラクティブな学習体験',
        description: '対話的な学習環境を提供する機能'
      },
      '04-2': {
        text: '進捗管理機能',
        description: '学習の進捗状況を管理する機能'
      },
      '04-3': {
        text: 'コード実行環境',
        description: 'プログラミングコードを実行・テストする環境'
      },
      '04-4': {
        text: 'ソーシャルコーディング',
        description: '他のユーザーとコードを共有・レビューする機能'
      },
      '05-1': {
        text: 'リアルタイムメッセージング',
        description: 'リアルタイムでメッセージをやり取りする機能'
      },
      '05-2': {
        text: 'グループチャット',
        description: 'グループでチャットを行う機能'
      },
      '05-3': {
        text: 'メディア共有',
        description: '画像や動画を共有する機能'
      },
      '05-4': {
        text: 'オンラインステータス管理',
        description: 'ユーザーのオンライン状態を管理する機能'
      }
    }
  },
  en: {
    basicInfo: {
      description: {
        text: 'Description',
        description: 'Project description'
      },
      features: {
        text: 'Features',
        description: 'List of main project features'
      },
      techStack: {
        text: 'Tech Stack',
        description: 'Technologies used in the project'
      },
      overview: {
        text: 'Overview',
        description: 'Project overview'
      },
      language: {
        text: 'Language',
        description: 'Programming languages used'
      },
      projectType: {
        text: 'Project Type',
        description: 'Type of project'
      },
      link: {
        text: 'Link',
        description: 'Related links'
      },
      mockups: {
        text: 'Mockups',
        description: 'Project mockup images'
      }
    },
    buttons: {
      demoButton: {
        text: 'View Demo',
        description: 'Open demo page'
      },
      officialButton: {
        text: 'Official Site',
        description: 'Open official site'
      },
      githubButton: {
        text: 'View on GitHub',
        description: 'Open GitHub repository'
      },
      downloadButton: {
        text: 'Download',
        description: 'Download the project'
      }
    },
    sections: {
      'core-features': {
        text: 'Core Features',
        description: 'List of core project features'
      },
      'screenshots': {
        text: 'Screenshots',
        description: 'Project screenshots'
      },
      'architecture': {
        text: 'Architecture',
        description: 'Project architecture explanation'
      },
      'demo-video': {
        text: 'Demo Video',
        description: 'Project demo video'
      },
      'technology': {
        text: 'Technology',
        description: 'Technologies used in the project'
      },
      'user-feedback': {
        text: 'User Feedback',
        description: 'Feedback from users'
      }
    },
    customContent: {
      'architecture-description': {
        text: 'This app uses Firebase as the backend and Vue.js as the frontend. Data is stored in Firestore, and images are stored in Cloud Storage. Authentication is handled by Firebase Authentication.',
        description: 'Overview of application architecture'
      }
    },
    testimonials: {
      'testimonial-1': {
        text: '"This app has been very helpful in managing my daily learning. It\'s easier to track progress than before."',
        description: 'Feedback about learning management'
      },
      'testimonial-2': {
        text: '"The interface is intuitive and easy to use. I particularly like the code execution environment."',
        description: 'Feedback about user interface'
      },
      'testimonial-3': {
        text: '"It\'s convenient when studying with friends. It\'s great to be able to check each other\'s progress."',
        description: 'Feedback about collaborative learning'
      }
    },
    screen: {
      '01-1': {
        text: 'Home Screen',
        description: 'Application home screen'
      },
      '01-2': {
        text: 'Registration Screen',
        description: 'User registration screen'
      },
      '01-3': {
        text: 'Detail Screen',
        description: 'Detailed information screen'
      },
      '01-4': {
        text: 'Search Screen',
        description: 'Search functionality screen'
      },
      '01-5': {
        text: 'Profile Screen',
        description: 'User profile screen'
      },
      '02-1': {
        text: 'Editor Screen',
        description: 'Text editor screen'
      },
      '02-2': {
        text: 'List Screen',
        description: 'Item list screen'
      },
      '02-3': {
        text: 'Settings Screen',
        description: 'Application settings screen'
      },
      '03-1': {
        text: 'Dashboard',
        description: 'Project dashboard'
      },
      '03-2': {
        text: 'Task Management',
        description: 'Task management screen'
      },
      '03-3': {
        text: 'Team Chat',
        description: 'Team communication screen'
      },
      '03-4': {
        text: 'Calendar',
        description: 'Schedule management screen'
      },
      '04-1': {
        text: 'Course List',
        description: 'Learning course list screen'
      },
      '04-2': {
        text: 'Learning Screen',
        description: 'Programming learning screen'
      },
      '04-3': {
        text: 'Progress Check',
        description: 'Learning progress check screen'
      },
      '05-1': {
        text: 'Feed',
        description: 'SNS feed screen'
      },
      '05-2': {
        text: 'Messages',
        description: 'Messaging screen'
      },
      '05-3': {
        text: 'Groups',
        description: 'Group management screen'
      }
    },
    type: {
      '01': {
        text: 'Mobile App',
        description: 'Smartphone application'
      },
      '02': {
        text: 'Web App',
        description: 'Browser-based application'
      },
      '03': {
        text: 'Web App',
        description: 'Browser-based application'
      },
      '04': {
        text: 'Web App',
        description: 'Browser-based application'
      },
      '05': {
        text: 'Mobile App',
        description: 'Smartphone application'
      }
    },
    feature: {
      '01-1': {
        text: 'Izakaya information registration and management',
        description: 'Feature to register and manage visited izakaya information'
      },
      '01-2': {
        text: 'Image upload and management',
        description: 'Feature to upload and manage store and food images'
      },
      '01-3': {
        text: 'Public/private settings',
        description: 'Feature to set post visibility'
      },
      '01-4': {
        text: 'Search and filtering functions',
        description: 'Feature to search and filter store information'
      },
      '02-1': {
        text: 'Markdown editor',
        description: 'Feature to edit text in markdown format'
      },
      '02-2': {
        text: 'Category management',
        description: 'Feature to categorize and manage articles'
      },
      '02-3': {
        text: 'Tag search',
        description: 'Feature to search articles using tags'
      },
      '02-4': {
        text: 'Dark mode support',
        description: 'Dark mode compatible UI'
      },
      '03-1': {
        text: 'Task management',
        description: 'Feature to manage project tasks'
      },
      '03-2': {
        text: 'Team communication',
        description: 'Feature for team member communication'
      },
      '03-3': {
        text: 'Schedule calendar',
        description: 'Feature to manage project schedules'
      },
      '03-4': {
        text: 'Performance analysis',
        description: 'Feature to analyze project progress and performance'
      },
      '04-1': {
        text: 'Interactive learning experience',
        description: 'Feature providing interactive learning environment'
      },
      '04-2': {
        text: 'Progress tracking',
        description: 'Feature to manage learning progress'
      },
      '04-3': {
        text: 'Code execution environment',
        description: 'Environment to execute and test programming code'
      },
      '04-4': {
        text: 'Social coding',
        description: 'Feature to share and review code with other users'
      },
      '05-1': {
        text: 'Real-time messaging',
        description: 'Feature for real-time message exchange'
      },
      '05-2': {
        text: 'Group chat',
        description: 'Feature for group chat'
      },
      '05-3': {
        text: 'Media sharing',
        description: 'Feature to share images and videos'
      },
      '05-4': {
        text: 'Online status management',
        description: 'Feature to manage user online status'
      }
    }
  }
}; 