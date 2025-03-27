import type { TranslationDict } from './types';

interface ProjectStatusTranslation {
  completed: string;
  'in-progress': string;
  planned: string;
  end: string;
}

interface ProjectTranslation {
  status: ProjectStatusTranslation;
  details: string;
  visit: string;
}

export const projectTranslations: TranslationDict<ProjectTranslation> = {
  ja: {
    status: {
      completed: '完了',
      'in-progress': '開発中',
      planned: '計画中',
      end: '終了'
    },
    details: '詳細',
    visit: 'サイトを訪問'
  },
  en: {
    status: {
      completed: 'Completed',
      'in-progress': 'In Progress',
      planned: 'Planned',
      end: 'Ended'
    },
    details: 'Details',
    visit: 'Visit Website'
  }
}; 