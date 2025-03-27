import type { TranslationDict } from './types';

interface CommonTranslation {
  back: string;
  close: string;
  cancel: string;
  confirm: string;
  save: string;
  edit: string;
  delete: string;
  loading: string;
  error: string;
  success: string;
}

export const commonTranslations: TranslationDict<CommonTranslation> = {
  ja: {
    back: '戻る',
    close: '閉じる',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    edit: '編集',
    delete: '削除',
    loading: '読み込み中...',
    error: 'エラーが発生しました',
    success: '完了しました'
  },
  en: {
    back: 'Back',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success'
  }
}; 