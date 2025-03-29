import type { TranslationDict, BaseTranslationItem } from './types';

/**
 * ギャラリー翻訳アイテムの型定義
 */
interface GalleryTranslation {
  /** プロンプト情報表示関連 */
  promptInfo: {
    /** プロンプトラベル */
    label: BaseTranslationItem;
  };
  /** モーダル操作関連 */
  modal: {
    /** 閉じるボタン */
    closeButton: BaseTranslationItem;
  };
  /** フィルター関連 */
  filter: {
    /** すべての項目を表示 */
    showAll: BaseTranslationItem;
  };
}

export const galleryTranslations: TranslationDict<GalleryTranslation> = {
  ja: {
    promptInfo: {
      label: {
        text: 'プロンプト',
        description: 'AIに与えた生成指示'
      }
    },
    modal: {
      closeButton: {
        text: '閉じる',
        description: 'ギャラリーを閉じる'
      }
    },
    filter: {
      showAll: {
        text: 'すべて',
        description: 'すべての作品を表示'
      }
    }
  },
  en: {
    promptInfo: {
      label: {
        text: 'Prompt',
        description: 'Generation instruction given to AI'
      }
    },
    modal: {
      closeButton: {
        text: 'Close',
        description: 'Close gallery'
      }
    },
    filter: {
      showAll: {
        text: 'All',
        description: 'Show all artworks'
      }
    }
  }
}; 