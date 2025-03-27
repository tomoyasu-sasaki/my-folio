import type { TranslationDict } from './types';

interface GalleryCommonTranslation {
  description: string;
}

interface GalleryItemTranslation {
  title: string;
}

interface GalleryItemsTranslation {
  [key: string]: GalleryItemTranslation;
}

interface GalleryDataTranslation {
  common: GalleryCommonTranslation;
  items: GalleryItemsTranslation;
}

export const galleryDataTranslations: TranslationDict<GalleryDataTranslation> = {
  ja: {
    common: {
      description: 'DALL-E2で生成したアート作品'
    },
    items: {
      '1': { title: 'AI生成イメージ 1' },
      '2': { title: 'AI生成イメージ 2' },
      '3': { title: 'AI生成イメージ 3' },
      '4': { title: 'AI生成イメージ 4' },
      '5': { title: 'AI生成イメージ 5' },
      '6': { title: 'AI生成イメージ 6' },
      '7': { title: 'AI生成イメージ 7' },
      '8': { title: 'AI生成イメージ 8' },
      '9': { title: 'AI生成イメージ 9' },
      '10': { title: 'AI生成イメージ 10' },
      '11': { title: 'AI生成イメージ 11' },
      '12': { title: 'AI生成イメージ 12' },
      '13': { title: 'AI生成イメージ 13' },
      '14': { title: 'AI生成イメージ 14' },
      '15': { title: 'AI生成イメージ 15' }
    }
  },
  en: {
    common: {
      description: 'Artwork generated with DALL-E2'
    },
    items: {
      '1': { title: 'AI Generated Image 1' },
      '2': { title: 'AI Generated Image 2' },
      '3': { title: 'AI Generated Image 3' },
      '4': { title: 'AI Generated Image 4' },
      '5': { title: 'AI Generated Image 5' },
      '6': { title: 'AI Generated Image 6' },
      '7': { title: 'AI Generated Image 7' },
      '8': { title: 'AI Generated Image 8' },
      '9': { title: 'AI Generated Image 9' },
      '10': { title: 'AI Generated Image 10' },
      '11': { title: 'AI Generated Image 11' },
      '12': { title: 'AI Generated Image 12' },
      '13': { title: 'AI Generated Image 13' },
      '14': { title: 'AI Generated Image 14' },
      '15': { title: 'AI Generated Image 15' }
    }
  }
}; 