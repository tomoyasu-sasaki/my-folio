import type { TranslationDict } from './types';

interface ProjectDetailSectionTitlesTranslation {
  'core-features': string;
  'screenshots': string;
  'architecture': string;
  'demo-video': string;
  'technology': string;
  'user-feedback': string;
}

interface ProjectDetailCustomContentTranslation {
  'architecture-description': string;
}

interface ProjectDetailTestimonialsTranslation {
  'testimonial-1': string;
  'testimonial-2': string;
  'testimonial-3': string;
}

interface ProjectDetailScreenTranslation {
  [key: string]: string;
}

interface ProjectDetailTypeTranslation {
  [key: string]: string;
}

interface ProjectDetailFeatureTranslation {
  [key: string]: string;
}

interface ProjectDetailTranslation {
  description: string;
  features: string;
  techStack: string;
  overview: string;
  language: string;
  projectType: string;
  link: string;
  mockups: string;
  demoButton: string;
  githubButton: string;
  downloadButton: string;
  sectionTitles: ProjectDetailSectionTitlesTranslation;
  customContent: ProjectDetailCustomContentTranslation;
  testimonials: ProjectDetailTestimonialsTranslation;
  screen: ProjectDetailScreenTranslation;
  type: ProjectDetailTypeTranslation;
  feature: ProjectDetailFeatureTranslation;
}

export const projectDetailTranslations: TranslationDict<ProjectDetailTranslation> = {
  ja: {
    description: '説明',
    features: '主な機能',
    techStack: '使用技術',
    overview: '概要',
    language: '開発言語',
    projectType: 'プロジェクトタイプ',
    link: 'リンク',
    mockups: 'モックアップ',
    demoButton: 'デモを見る',
    githubButton: 'GitHubで見る',
    downloadButton: 'ダウンロード',
    sectionTitles: {
      'core-features': '主要機能',
      'screenshots': 'スクリーンショット',
      'architecture': 'アーキテクチャ',
      'demo-video': 'デモ動画',
      'technology': '使用技術',
      'user-feedback': 'ユーザーの声'
    },
    customContent: {
      'architecture-description': 'このアプリはFirebaseをバックエンドに、Vue.jsをフロントエンドに使用しています。データはFirestoreに保存され、画像はCloud Storageに保存されます。認証はFirebase Authenticationを使用しています。'
    },
    testimonials: {
      'testimonial-1': '「このアプリは私の日々の学習を管理するのに非常に役立っています。以前より進捗を把握しやすくなりました。」',
      'testimonial-2': '「インターフェースが直感的で使いやすいです。コードの実行環境が特に気に入っています。」',
      'testimonial-3': '「友達と一緒に勉強するときに便利です。お互いの進捗を確認できるのが良いですね。」'
    },
    screen: {
      '01-1': 'ホーム画面',
      '01-2': '登録画面',
      '01-3': '詳細画面',
      '01-4': '検索画面',
      '01-5': 'プロフィール画面',
      '02-1': 'エディタ画面',
      '02-2': '一覧画面',
      '02-3': '設定画面',
      '03-1': 'ダッシュボード',
      '03-2': 'タスク管理',
      '03-3': 'チームチャット',
      '03-4': 'カレンダー',
      '04-1': 'コース一覧',
      '04-2': '学習画面',
      '04-3': '進捗確認',
      '05-1': 'フィード',
      '05-2': 'メッセージ',
      '05-3': 'グループ'
    },
    type: {
      '01': 'モバイルアプリ',
      '02': 'Webアプリ',
      '03': 'Webアプリ',
      '04': 'Webアプリ',
      '05': 'モバイルアプリ',
    },
    feature: {
      '01-1': '居酒屋情報の登録・管理',
      '01-2': '画像投稿・管理機能',
      '01-3': '公開/非公開設定',
      '01-4': '検索・フィルタリング機能',
      '02-1': 'マークダウン対応エディタ',
      '02-2': 'カテゴリ管理',
      '02-3': 'タグ検索機能',
      '02-4': 'ダークモード対応',
      '03-1': 'タスク管理機能',
      '03-2': 'チーム間コミュニケーション',
      '03-3': 'スケジュールカレンダー',
      '03-4': 'パフォーマンス分析',
      '04-1': 'インタラクティブな学習体験',
      '04-2': '進捗管理機能',
      '04-3': 'コード実行環境',
      '04-4': 'ソーシャルコーディング',
      '05-1': 'リアルタイムメッセージング',
      '05-2': 'グループチャット',
      '05-3': 'メディア共有',
      '05-4': 'オンラインステータス管理',
    },
  },
  en: {
    description: 'Description',
    features: 'Key Features',
    techStack: 'Technology Stack',
    overview: 'Overview',
    language: 'Development Language',
    projectType: 'Project Type',
    link: 'Link',
    mockups: 'Mockups',
    demoButton: 'View Demo',
    githubButton: 'View on GitHub',
    downloadButton: 'Download',
    sectionTitles: {
      'core-features': 'Core Features',
      'screenshots': 'Screenshots',
      'architecture': 'Architecture',
      'demo-video': 'Demo Video',
      'technology': 'Technology',
      'user-feedback': 'User Feedback'
    },
    customContent: {
      'architecture-description': 'This app uses Firebase as a backend and Vue.js as a frontend. Data is stored in Firestore and images are stored in Cloud Storage. Authentication is handled by Firebase Authentication.'
    },
    testimonials: {
      'testimonial-1': '"This app has been very helpful in managing my daily learning. It\'s easier to track progress than before."',
      'testimonial-2': '"The interface is intuitive and easy to use. I especially like the code execution environment."',
      'testimonial-3': '"It\'s convenient when studying with friends. It\'s great to be able to check each other\'s progress."'
    },
    screen: {
      '01-1': 'Home Screen',
      '01-2': 'Registration Screen',
      '01-3': 'Detail Screen',
      '01-4': 'Search Screen',
      '01-5': 'Profile Screen',
      '02-1': 'Editor Screen',
      '02-2': 'List Screen',
      '02-3': 'Settings Screen',
      '03-1': 'Dashboard',
      '03-2': 'Task Management',
      '03-3': 'Team Chat',
      '03-4': 'Calendar',
      '04-1': 'Course List',
      '04-2': 'Learning Screen',
      '04-3': 'Progress Check',
      '05-1': 'Feed',
      '05-2': 'Messages',
      '05-3': 'Groups'
    },
    type: {
      '01': 'Mobile App',
      '02': 'Web App',
      '03': 'Web App',
      '04': 'Web App',
      '05': 'Mobile App',
    },
    feature: {
      '01-1': 'Izakaya information registration and management',
      '01-2': 'Image upload and management',
      '01-3': 'Public/private settings',
      '01-4': 'Search and filtering functions',
      '02-1': 'Markdown editor',
      '02-2': 'Category management',
      '02-3': 'Tag search',
      '02-4': 'Dark mode support',
      '03-1': 'Task management',
      '03-2': 'Team communication',
      '03-3': 'Schedule calendar',
      '03-4': 'Performance analysis',
      '04-1': 'Interactive learning experience',
      '04-2': 'Progress tracking',
      '04-3': 'Code execution environment',
      '04-4': 'Social coding',
      '05-1': 'Real-time messaging',
      '05-2': 'Group chat',
      '05-3': 'Media sharing',
      '05-4': 'Online status management',
    },
  },
}; 