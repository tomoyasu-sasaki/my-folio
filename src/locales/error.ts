import type { TranslationDict, BaseTranslationItem } from './types';

/**
 * エラーメッセージの翻訳アイテムの型定義
 */
interface ErrorTranslation {
  /** 一般的なエラー */
  general: {
    /** 不明なエラー */
    unknown: BaseTranslationItem;
    /** ネットワークエラー */
    network: BaseTranslationItem;
    /** サーバーエラー */
    server: BaseTranslationItem;
  };
  /** バリデーションエラー */
  validation: {
    /** 必須項目 */
    required: BaseTranslationItem;
    /** 不正な値 */
    invalid: BaseTranslationItem;
  };
  /** 翻訳関連のエラー */
  translation: {
    /** セクションが見つからない */
    sectionNotFound: BaseTranslationItem;
    /** キーが見つからない */
    keyNotFound: BaseTranslationItem;
  };
}

/**
 * エラーメッセージの翻訳データ
 */
export const errorTranslations: TranslationDict<ErrorTranslation> = {
  ja: {
    general: {
      unknown: {
        text: '予期せぬエラーが発生しました',
        description: '不明なエラーが発生した場合のメッセージ'
      },
      network: {
        text: 'ネットワークエラーが発生しました',
        description: 'ネットワーク接続に問題がある場合のメッセージ'
      },
      server: {
        text: 'サーバーエラーが発生しました',
        description: 'サーバー側で問題が発生した場合のメッセージ'
      }
    },
    validation: {
      required: {
        text: '必須項目です',
        description: '必須入力項目が未入力の場合のメッセージ'
      },
      invalid: {
        text: '入力値が不正です',
        description: '入力値が要件を満たしていない場合のメッセージ'
      }
    },
    translation: {
      sectionNotFound: {
        text: '翻訳セクションが見つかりません',
        description: '指定された翻訳セクションが存在しない場合のメッセージ'
      },
      keyNotFound: {
        text: '翻訳キーが見つかりません',
        description: '指定された翻訳キーが存在しない場合のメッセージ'
      }
    }
  },
  en: {
    general: {
      unknown: {
        text: 'An unexpected error occurred',
        description: 'Message for unknown errors'
      },
      network: {
        text: 'A network error occurred',
        description: 'Message for network connection issues'
      },
      server: {
        text: 'A server error occurred',
        description: 'Message for server-side issues'
      }
    },
    validation: {
      required: {
        text: 'This field is required',
        description: 'Message for required fields that are empty'
      },
      invalid: {
        text: 'Invalid input value',
        description: 'Message for input values that do not meet requirements'
      }
    },
    translation: {
      sectionNotFound: {
        text: 'Translation section not found',
        description: 'Message when specified translation section does not exist'
      },
      keyNotFound: {
        text: 'Translation key not found',
        description: 'Message when specified translation key does not exist'
      }
    }
  }
}; 