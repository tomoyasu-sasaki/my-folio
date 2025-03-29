import type { TranslationDict, BaseTranslationItem } from './types';

/**
 * 共通翻訳アイテムの型定義
 */
export interface CommonTranslation {
  /** ナビゲーション関連 */
  navigation: {
    /** 戻るボタン */
    back: BaseTranslationItem;
  };
  /** モーダル操作関連 */
  modal: {
    /** 閉じるボタン */
    close: BaseTranslationItem;
  };
  /** アクション関連 */
  action: {
    /** キャンセルボタン */
    cancel: BaseTranslationItem;
    /** 確認ボタン */
    confirm: BaseTranslationItem;
    /** 保存ボタン */
    save: BaseTranslationItem;
    /** 編集ボタン */
    edit: BaseTranslationItem;
    /** 削除ボタン */
    delete: BaseTranslationItem;
  };
  /** 状態表示関連 */
  status: {
    /** ローディング表示 */
    loading: BaseTranslationItem;
    /** エラー表示 */
    error: BaseTranslationItem;
    /** 成功表示 */
    success: BaseTranslationItem;
  };
}

/**
 * 共通翻訳データ
 */
export const commonTranslations: TranslationDict<CommonTranslation> = {
  ja: {
    navigation: {
      back: {
        text: '戻る',
        description: '前のページに戻る'
      }
    },
    modal: {
      close: {
        text: '閉じる',
        description: 'モーダルを閉じる'
      }
    },
    action: {
      cancel: {
        text: 'キャンセル',
        description: '操作をキャンセルする'
      },
      confirm: {
        text: '確認',
        description: '操作を確認する'
      },
      save: {
        text: '保存',
        description: '変更を保存する'
      },
      edit: {
        text: '編集',
        description: '内容を編集する'
      },
      delete: {
        text: '削除',
        description: '項目を削除する'
      }
    },
    status: {
      loading: {
        text: '読み込み中...',
        description: 'コンテンツを読み込んでいる状態'
      },
      error: {
        text: 'エラーが発生しました',
        description: 'エラーが発生した状態'
      },
      success: {
        text: '完了しました',
        description: '操作が成功した状態'
      }
    }
  },
  en: {
    navigation: {
      back: {
        text: 'Back',
        description: 'Go back to previous page'
      }
    },
    modal: {
      close: {
        text: 'Close',
        description: 'Close the modal'
      }
    },
    action: {
      cancel: {
        text: 'Cancel',
        description: 'Cancel the operation'
      },
      confirm: {
        text: 'Confirm',
        description: 'Confirm the operation'
      },
      save: {
        text: 'Save',
        description: 'Save changes'
      },
      edit: {
        text: 'Edit',
        description: 'Edit content'
      },
      delete: {
        text: 'Delete',
        description: 'Delete item'
      }
    },
    status: {
      loading: {
        text: 'Loading...',
        description: 'Content is being loaded'
      },
      error: {
        text: 'An error occurred',
        description: 'An error state'
      },
      success: {
        text: 'Completed',
        description: 'Operation successful state'
      }
    }
  }
}; 