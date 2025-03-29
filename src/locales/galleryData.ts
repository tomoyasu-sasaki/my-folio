import type { TranslationDict, BaseTranslationItem, NumericKeyTranslationItem } from './types';

/**
 * ギャラリーセクション共通翻訳アイテムの型定義
 */
interface GallerySectionTranslation extends BaseTranslationItem {
  /** セクションの説明文 */
  description: string;
}

/**
 * ギャラリーアイテム翻訳の型定義
 */
interface GalleryItemTranslation extends BaseTranslationItem {
  /** アイテムのタイトル */
  title: string;
  /** アイテムの説明文 */
  description?: string;
}

/**
 * ギャラリーアイテムコレクションの型定義
 */
interface GalleryItemsTranslation extends NumericKeyTranslationItem {
  /** 数値キーに基づくギャラリーアイテム */
  [key: `${number}`]: GalleryItemTranslation;
}

/**
 * ギャラリーデータ翻訳の型定義
 */
interface GalleryDataTranslation {
  /** セクション共通の翻訳 */
  section: GallerySectionTranslation;
  /** ギャラリーアイテムのコレクション */
  items: GalleryItemsTranslation;
}

export const galleryDataTranslations: TranslationDict<GalleryDataTranslation> = {
  ja: {
    section: {
      text: 'ギャラリー',
      description: 'DALL-E2で生成したアート作品'
    },
    items: {
      '1': { text: 'AI生成イメージ 1', title: 'AI生成イメージ 1', description: 'DALL-E2で生成した作品 1' },
      '2': { text: 'AI生成イメージ 2', title: 'AI生成イメージ 2', description: 'DALL-E2で生成した作品 2' },
      '3': { text: 'AI生成イメージ 3', title: 'AI生成イメージ 3', description: 'DALL-E2で生成した作品 3' },
      '4': { text: 'AI生成イメージ 4', title: 'AI生成イメージ 4', description: 'DALL-E2で生成した作品 4' },
      '5': { text: 'AI生成イメージ 5', title: 'AI生成イメージ 5', description: 'DALL-E2で生成した作品 5' },
      '6': { text: 'AI生成イメージ 6', title: 'AI生成イメージ 6', description: 'DALL-E2で生成した作品 6' },
      '7': { text: 'AI生成イメージ 7', title: 'AI生成イメージ 7', description: 'DALL-E2で生成した作品 7' },
      '8': { text: 'AI生成イメージ 8', title: 'AI生成イメージ 8', description: 'DALL-E2で生成した作品 8' },
      '9': { text: 'AI生成イメージ 9', title: 'AI生成イメージ 9', description: 'DALL-E2で生成した作品 9' },
      '10': { text: 'AI生成イメージ 10', title: 'AI生成イメージ 10', description: 'DALL-E2で生成した作品 10' },
      '11': { text: 'AI生成イメージ 11', title: 'AI生成イメージ 11', description: 'DALL-E2で生成した作品 11' },
      '12': { text: 'AI生成イメージ 12', title: 'AI生成イメージ 12', description: 'DALL-E2で生成した作品 12' },
      '13': { text: 'AI生成イメージ 13', title: 'AI生成イメージ 13', description: 'DALL-E2で生成した作品 13' },
      '14': { text: 'AI生成イメージ 14', title: 'AI生成イメージ 14', description: 'DALL-E2で生成した作品 14' },
      '15': { text: 'AI生成イメージ 15', title: 'AI生成イメージ 15', description: 'DALL-E2で生成した作品 15' }
    }
  },
  en: {
    section: {
      text: 'Gallery',
      description: 'Artwork generated with DALL-E2'
    },
    items: {
      '1': { text: 'AI Generated Image 1', title: 'AI Generated Image 1', description: 'Artwork 1 generated with DALL-E2' },
      '2': { text: 'AI Generated Image 2', title: 'AI Generated Image 2', description: 'Artwork 2 generated with DALL-E2' },
      '3': { text: 'AI Generated Image 3', title: 'AI Generated Image 3', description: 'Artwork 3 generated with DALL-E2' },
      '4': { text: 'AI Generated Image 4', title: 'AI Generated Image 4', description: 'Artwork 4 generated with DALL-E2' },
      '5': { text: 'AI Generated Image 5', title: 'AI Generated Image 5', description: 'Artwork 5 generated with DALL-E2' },
      '6': { text: 'AI Generated Image 6', title: 'AI Generated Image 6', description: 'Artwork 6 generated with DALL-E2' },
      '7': { text: 'AI Generated Image 7', title: 'AI Generated Image 7', description: 'Artwork 7 generated with DALL-E2' },
      '8': { text: 'AI Generated Image 8', title: 'AI Generated Image 8', description: 'Artwork 8 generated with DALL-E2' },
      '9': { text: 'AI Generated Image 9', title: 'AI Generated Image 9', description: 'Artwork 9 generated with DALL-E2' },
      '10': { text: 'AI Generated Image 10', title: 'AI Generated Image 10', description: 'Artwork 10 generated with DALL-E2' },
      '11': { text: 'AI Generated Image 11', title: 'AI Generated Image 11', description: 'Artwork 11 generated with DALL-E2' },
      '12': { text: 'AI Generated Image 12', title: 'AI Generated Image 12', description: 'Artwork 12 generated with DALL-E2' },
      '13': { text: 'AI Generated Image 13', title: 'AI Generated Image 13', description: 'Artwork 13 generated with DALL-E2' },
      '14': { text: 'AI Generated Image 14', title: 'AI Generated Image 14', description: 'Artwork 14 generated with DALL-E2' },
      '15': { text: 'AI Generated Image 15', title: 'AI Generated Image 15', description: 'Artwork 15 generated with DALL-E2' }
    }
  }
}; 