/**
 * サポートされている言語コード
 */
export type Language = 'ja' | 'en';

/**
 * 言語キーと翻訳値のインターフェース
 */
export type TranslationDict<T> = Record<Language, T>;

/**
 * セクション名の型定義
 */
export type SectionName = 
  | 'navigation' 
  | 'project' 
  | 'gallery' 
  | 'about' 
  | 'skill' 
  | 'career' 
  | 'languageSwitch' 
  | 'projectData' 
  | 'galleryData' 
  | 'projectDetail' 
  | 'common'; 