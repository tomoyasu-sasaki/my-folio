import type { TranslationDict } from './types';

interface ProjectItemTranslation {
  title: string;
  subtitle: string;
  description: string;
}

interface ProjectDataTranslation {
  [key: string]: ProjectItemTranslation;
}

export const projectDataTranslations: TranslationDict<ProjectDataTranslation> = {
  ja: {
    '01': {
      title: 'GastronomeJourney',
      subtitle: '行った居酒屋の記録用スマホアプリ',
      description: '訪れた居酒屋の情報や感想を記録・共有できるスマホアプリケーション'
    },
    '02': {
      title: 'Blogfy',
      subtitle: '日記アプリ',
      description: 'マークダウン対応の日記作成・管理アプリケーション'
    },
    '03': {
      title: 'TeamFlow',
      subtitle: 'プロジェクト管理Webアプリ',
      description: 'チームのタスク管理とコミュニケーションを効率化するWebアプリ'
    },
    '04': {
      title: 'CodeLearner',
      subtitle: '勉強進捗管理Webアプリ',
      description: 'プログラミング学習の進捗を可視化・管理するWebアプリ'
    },
    '05': {
      title: 'ConnectSphere',
      subtitle: 'Twitter風SNSWebアプリ',
      description: 'プログラマー向けのSNSプラットフォーム'
    }
  },
  en: {
    '01': {
      title: 'GastronomeJourney',
      subtitle: 'Web app for recording visited izakayas',
      description: 'Web application that allows recording and sharing information and impressions of visited izakayas'
    },
    '02': {
      title: 'Blogfy',
      subtitle: 'Diary app',
      description: 'Markdown-compatible diary creation and management application'
    },
    '03': {
      title: 'TeamFlow',
      subtitle: 'Project management web app',
      description: 'Web app that streamlines team task management and communication'
    },
    '04': {
      title: 'CodeLearner',
      subtitle: 'Study progress management web app',
      description: 'Web app for visualizing and managing programming learning progress'
    },
    '05': {
      title: 'ConnectSphere',
      subtitle: 'Twitter-like SNS web app',
      description: 'SNS platform for programmers'
    }
  }
}; 