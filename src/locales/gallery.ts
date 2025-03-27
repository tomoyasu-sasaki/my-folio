import type { TranslationDict } from './types';

interface GalleryTranslation {
  prompt: string;
  close: string;
  all: string;
}

export const galleryTranslations: TranslationDict<GalleryTranslation> = {
  ja: {
    prompt: 'プロンプト',
    close: '閉じる',
    all: 'すべて'
  },
  en: {
    prompt: 'Prompt',
    close: 'Close',
    all: 'All'
  }
}; 