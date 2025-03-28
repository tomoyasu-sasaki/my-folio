/**
 * 基本的な型定義
 */

// 言語コード
export type Language = 'ja' | 'en';

// プリミティブ値の型
export type TranslationPrimitive = string | number | boolean | null;

/**
 * 基本的な翻訳構造
 */

// 基本的な翻訳アイテム
export interface BaseTranslationItem {
  text: string;
  description?: string;
}

// メタデータを持つ翻訳アイテム
export interface MetadataTranslationItem extends BaseTranslationItem {
  metadata?: Record<string, TranslationPrimitive>;
}

// 階層構造を持つ翻訳アイテム
export interface NestedTranslationItem {
  [key: string]: TranslationValue;
}

// 数値キーを持つ翻訳アイテム
export interface NumericKeyTranslationItem {
  [key: `${number}`]: TranslationValue;
}

/**
 * 特殊な翻訳アイテム
 */

// ナビゲーション項目
export interface NavigationTranslationItem extends BaseTranslationItem {
  ariaLabel: string;
}

// プロジェクト項目
export interface ProjectTranslationItem extends BaseTranslationItem {
  title: string;
  subtitle: string;
  description: string;
  features?: string[];
  techStack?: string[];
}

// キャリア項目
export interface CareerTranslationItem extends BaseTranslationItem {
  title: string;
  subtitle: string;
  description: string;
  category?: string;
  date?: {
    year: string;
    month: string;
  };
}

// ステータス項目
export interface StatusTranslationItem {
  [key: string]: string;
}

// カテゴリー項目
export interface CategoryTranslationItem {
  [key: string]: string;
}

/**
 * 翻訳値の型システム
 */

// 基本的な翻訳値（再帰的な型）
export type TranslationValue =
  | TranslationPrimitive
  | BaseTranslationItem
  | MetadataTranslationItem
  | NavigationTranslationItem
  | ProjectTranslationItem
  | CareerTranslationItem
  | NestedTranslationItem
  | NumericKeyTranslationItem
  | StatusTranslationItem
  | CategoryTranslationItem
  | TranslationValue[]
  | undefined;

// 言語ごとの翻訳辞書
export type TranslationDict<T> = Record<Language, T>;

// セクションごとの翻訳辞書のベース
export type BaseTranslationDict = {
  [key: string]: TranslationValue;
};

/**
 * バリデーション関連の型定義
 */

// バリデーションルールの種類
export type ValidationRuleType = 'required' | 'pattern' | 'custom';

// バリデーションルール
export interface ValidationRule {
  type: ValidationRuleType;
  message: string;
  validate: (value: TranslationValue) => boolean;
}

// バリデーションエラー
export interface ValidationError {
  path: string[];
  rule: ValidationRule;
  value: TranslationValue;
}

// バリデーション結果
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// バリデーション関数の型
export type ValidationFunction = (value: TranslationValue, rules: ValidationRule[]) => ValidationResult;

/**
 * 関数と列挙型の定義
 */

// プロジェクト状態
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'end';

// セクション名
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
  | 'contact'
  | 'common';

// 翻訳関数の型
export type TranslationFunction = (
  section: SectionName,
  key: string,
  subKey?: string,
  itemId?: string
) => string;

// 翻訳キーの型
export type TranslationKey = string | [string, string] | [string, string, string];

/**
 * エラー関連の型
 */

// エラーコード
export type ErrorCode = 
  | 'SECTION_NOT_FOUND'
  | 'KEY_NOT_FOUND'
  | 'INVALID_VALUE'
  | 'VALIDATION_ERROR';

// エラーメッセージ
export interface TranslationError {
  code: ErrorCode;
  message: string;
  section?: SectionName;
  key?: string;
  details?: unknown;
} 