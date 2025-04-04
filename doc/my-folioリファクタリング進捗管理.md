# my-folio リファクタリング進捗管理

## 現在の実装状況

### 使用技術
- Vue.js 3 + TypeScript
- Vite
- Pinia (状態管理)
- Vue Router
- Vuetify (UIコンポーネント)
- BabylonJS (3Dグラフィックス)
- ApexCharts (グラフ表示)

### プロジェクト概要
静的なポートフォリオサイトとして、プロジェクト、スキル、ギャラリー、キャリアなどの情報を表示するウェブアプリケーションです。多言語対応（日本語・英語）を実装しており、3Dビューモードも備えています。

### 現状の課題
1. 型安全性が不十分（`@ts-ignore`の多用）
2. i18n実装が複雑で拡張性に欠ける
3. コンポーネントの責務が大きすぎる
4. ストア実装が複雑で保守が難しい
5. エラーハンドリングが不十分
6. テスト不足
7. パフォーマンス最適化余地あり

## リファクタリングの目標

現在のコードベースから、以下の目標を達成するためのリファクタリングを行います：

1. **型安全性の向上**: TypeScriptの型システムを最大限活用し、`@ts-ignore`を排除する
2. **コンポーネント設計の改善**: Atomic Designパターンを採用し、再利用性と保守性を高める
3. **ストア構造の改善**: データの正規化と責務の分離により、状態管理を簡素化する
4. **i18n実装の改善**: JSON形式への移行と構造化により、翻訳管理を容易にする
5. **テスト導入**: 単体テストを導入し、コードの品質を確保する
6. **パフォーマンス最適化**: 不要な再計算を防止し、レンダリング効率を向上させる

## リファクタリングの範囲

### 対象外
- **babylonJS関連**: `src/components/babylon/` ディレクトリ内の3D関連コンポーネントは、専門性が高く独立した機能のため、現時点でのリファクタリング作業の対象外とします。

## リファクタリング作業ステップと進捗状況

### 現在のフェーズ: ストア構造の改善
**進行中のタスク**: データ構造の正規化

### 1. 型定義の改善 (完了 - 100%)
- **目標**: TypeScriptの型安全性を高め、`@ts-ignore`を削減する
- **完了したタスク**:
  - [x] 翻訳データの型定義を厳密化
  - [x] ユーティリティ型を活用した型推論の強化
  - [x] 型チェックの強化とエラー検出の改善

### 2. 開発時のエラー検出と防止の強化 (完了 - 100%)
- **目標**: 開発時の問題を早期に発見し、品質を向上させる
- **完了したタスク**:
  - [x] エラーログ収集の実装
  - [x] 型チェックの強化
  - [x] エラーハンドリングの改善
  - [x] デバッグログの充実化

### 3. ストアの構造改善 (完了 - 100%)
- **目標**: データ管理の単純化と効率化
- **進捗状況**:
  - [x] ストア構造の分析と課題の特定
  - [x] Props/Emitsパターンの適用
    - [x] 翻訳関連の型定義の作成
    - [x] コンポーネントの依存関係の整理
    - [x] テストケースの更新
  - [x] データ構造の正規化
    - [x] プロジェクトセクションの正規化
      - [x] データ層とプレゼンテーション層の分離
      - [x] リレーション管理の実装
      - [x] 初期化処理のテスト実装
      - [x] useProjectDataコンポーザブルの移行
      - [x] 既存コンポーネントの移行
    - [x] スキルセクションの正規化
      - [x] データ層とプレゼンテーション層の分離
      - [x] リレーション管理の実装
      - [x] 正規化されたストアの作成
      - [x] useSkillDataコンポーザブルの作成
      - [x] 既存コンポーネントの移行
    - [x] ギャラリーセクションの正規化
      - [x] データ層とプレゼンテーション層の分離
      - [x] リレーション管理の実装
      - [x] 初期化処理のテスト実装
      - [x] useGalleryDataコンポーザブルの作成
      - [x] 既存コンポーネントの移行
    - [x] キャリアセクションの正規化
      - [x] データ層とプレゼンテーション層の分離
      - [x] リレーション管理の実装
      - [x] 初期化処理のテスト実装
      - [x] useCareerDataコンポーザブルの作成
      - [x] 既存コンポーネントの移行
    - [x] リアクティブ性能の最適化
      - [x] 計算プロパティの見直し
      - [x] メモ化の適用
      - [x] コンポーネントの再レンダリング分析
      - [x] パフォーマンスボトルネックの改善

### 4. コンポーネント構造の改善（計画中 - 0%）
- **目標**: Atomic Designパターンを採用し、再利用性と保守性を高める
- **計画**:
  - [ ] コンポーネント設計方針の策定
  - [ ] ディレクトリ構造の再編成
  - [ ] 既存コンポーネントの分類と整理
  - [ ] 基本atomsコンポーネントの作成
  - [ ] moleculesへのリファクタリング
  - [ ] organismsへのリファクタリング
  - [ ] templatesの作成
  - [ ] ページコンポーネントの整理

### 5. i18n実装の改善（計画中 - 0%）
- **目標**: JSON形式への移行と構造化により、翻訳管理を容易にする
- **計画**:
  - [ ] i18nディレクトリ構造の作成
  - [ ] 言語ごとのディレクトリ分離
  - [ ] 翻訳データのJSON化
  - [ ] 翻訳ユーティリティの改善
  - [ ] コンポーネントでの使用方法の統一

### 6. テストの強化（計画中 - 0%）
- **目標**: 単体テストを導入し、コードの品質を確保する
- **計画**:
  - [ ] テスト戦略の策定
  - [ ] コンポーネントテストの実装
  - [ ] ストアテストの実装
  - [ ] utilsテストの実装
  - [ ] composablesテストの実装

### 7. パフォーマンス最適化（計画中 - 0%）
- **目標**: 不要な再計算を防止し、レンダリング効率を向上させる
- **計画**:
  - [ ] パフォーマンス計測の実装
  - [ ] メモ化の適用
  - [ ] 不要な再レンダリングの防止
  - [ ] 画像最適化

## 詳細リファクタリング計画

### フェーズ1: ストア構造の完全正規化（現在進行中）

#### スキルセクションの正規化（次のタスク）
- **目的**: データとプレゼンテーションの分離、関連の明確化
- **作業内容**:
  1. `src/stores/normalized/skill.ts` の作成
     - 正規化されたスキルデータモデルの定義
     - 関係管理の実装
  2. `src/composables/useSkillData.ts` の作成
     - 正規化されたストアからのデータ取得ロジック
  3. スキルコンポーネントの更新
     - `SkillSection.vue`の更新
     - `SkillChart.vue`の更新
  4. テストの実装
     - 初期化処理のテスト
     - データ取得のテスト

#### ギャラリーセクションの正規化
- **目的**: データとプレゼンテーションの分離、関連の明確化
- **作業内容**:
  1. `src/stores/normalized/gallery.ts` の作成
     - 正規化されたギャラリーデータモデルの定義
     - 関係管理の実装
  2. `src/composables/useGalleryData.ts` の作成
     - 正規化されたストアからのデータ取得ロジック
  3. ギャラリーコンポーネントの更新
     - `GallerySection.vue`の更新
     - `GalleryCard.vue`の更新
  4. テストの実装
     - 初期化処理のテスト
     - データ取得のテスト

#### キャリアセクションの正規化
- **目的**: データとプレゼンテーションの分離、関連の明確化
- **作業内容**:
  1. `src/stores/normalized/career.ts` の作成
     - 正規化されたキャリアデータモデルの定義
     - 関係管理の実装
  2. `src/composables/useCareerData.ts` の作成
     - 正規化されたストアからのデータ取得ロジック
  3. キャリアコンポーネントの更新
     - `CarrerSection.vue`の更新
     - `CareerTimelineItem.vue`の更新
  4. テストの実装
     - 初期化処理のテスト
     - データ取得のテスト

#### リアクティブ性能の最適化
- **目的**: 不要な再計算の防止、レンダリング効率の向上
- **作業内容**:
  1. 計算プロパティの見直し
  2. メモ化の適用
  3. コンポーネントの再レンダリング分析
  4. パフォーマンスボトルネックの改善

### フェーズ2: Atomic Designパターンへの移行

#### 準備作業
- **目的**: コンポーネント設計方針の策定とディレクトリ構造の再編成
- **作業内容**:
  1. `src/components/atoms`、`molecules`、`organisms`、`templates` ディレクトリの作成
  2. 既存コンポーネントの分析と分類
  3. 移行計画の詳細化

#### Atomsコンポーネントの作成
- **目的**: 最小単位の再利用可能なコンポーネントの作成
- **作業内容**:
  1. `src/components/atoms/buttons` ディレクトリの作成と実装
     - 基本ボタンコンポーネント
     - アイコンボタンコンポーネント
  2. `src/components/atoms/inputs` ディレクトリの作成と実装
     - テキスト入力コンポーネント
     - セレクトコンポーネント
  3. `src/components/atoms/displays` ディレクトリの作成と実装
     - テキスト表示コンポーネント
     - アイコン表示コンポーネント
     - バッジコンポーネント

#### Moleculesコンポーネントの作成
- **目的**: 複数のatomsを組み合わせた再利用可能なコンポーネントの作成
- **作業内容**:
  1. `src/components/molecules/cards` ディレクトリの作成と実装
     - 基本カードコンポーネント
     - 情報カードコンポーネント
  2. `src/components/molecules/forms` ディレクトリの作成と実装
     - フォームグループコンポーネント
     - 検索フォームコンポーネント
  3. `src/components/molecules/lists` ディレクトリの作成と実装
     - リストアイテムコンポーネント
     - タグリストコンポーネント

#### Organismsコンポーネントの作成
- **目的**: 機能単位の複合コンポーネントの作成
- **作業内容**:
  1. `src/components/organisms/headers` ディレクトリの作成と実装
     - ヘッダーコンポーネント
     - ナビゲーションコンポーネント
  2. `src/components/organisms/sections` ディレクトリの作成と実装
     - セクションコンテナコンポーネント
     - プロジェクトグリッドコンポーネント
     - スキルグリッドコンポーネント
     - ギャラリーグリッドコンポーネント
     - キャリアタイムラインコンポーネント
  3. `src/components/organisms/modals` ディレクトリの作成と実装
     - モーダルコンポーネント
     - ダイアログコンポーネント

#### Templatesとページの整理
- **目的**: レイアウト構造とページコンポーネントの分離
- **作業内容**:
  1. `src/components/templates` ディレクトリの作成と実装
     - 基本レイアウトテンプレート
     - 詳細ページテンプレート
  2. `src/layouts` ディレクトリの作成と実装
     - DefaultLayout.vue
  3. `src/pages` ディレクトリの作成と実装
     - 既存のビューコンポーネントからページコンポーネントへの移行
     - HomePage.vue
     - ProjectDetailPage.vue
     - BabylonFolioPage.vue
     - NotFoundPage.vue

### フェーズ3: i18n実装の改善

#### i18nディレクトリ構造の作成
- **目的**: 翻訳データの構造化と管理の容易化
- **作業内容**:
  1. `src/i18n` ディレクトリの作成
  2. `src/i18n/config.ts` の作成
  3. `src/i18n/index.ts` の作成
  4. `src/i18n/locales` ディレクトリの作成
     - `en` ディレクトリの作成
     - `ja` ディレクトリの作成

#### 翻訳データのJSON化
- **目的**: メンテナンス性の向上
- **作業内容**:
  1. 既存の翻訳データのJSON形式への変換
     - common.json
     - project.json
     - skill.json
     - gallery.json
     - career.json
     - navigation.json
     - error.json
  2. 言語別ファイルの作成
     - 英語版の作成
     - 日本語版の作成

#### 翻訳ユーティリティの改善
- **目的**: 使いやすさと型安全性の向上
- **作業内容**:
  1. `src/composables/utils/useTranslation.ts` の更新
  2. 型定義の改善
  3. エラーハンドリングの強化

### フェーズ4: テストの強化

#### テスト構造の設定
- **目的**: 効率的なテスト環境の構築
- **作業内容**:
  1. `tests` ディレクトリの作成
  2. `tests/unit` ディレクトリの作成
     - components
     - composables
     - stores
     - utils サブディレクトリの作成
  3. テスト設定ファイルの更新

#### コンポーネントテストの実装
- **目的**: UI層の動作確認
- **作業内容**:
  1. Atoms コンポーネントのテスト実装
  2. Molecules コンポーネントのテスト実装
  3. Organisms コンポーネントのテスト実装
  4. Templates コンポーネントのテスト実装

#### ストアとロジックのテスト実装
- **目的**: データ層とロジック層の動作確認
- **作業内容**:
  1. 正規化されたストアのテスト実装
  2. コンポーザブルのテスト実装
  3. ユーティリティ関数のテスト実装

### フェーズ5: パフォーマンス最適化

#### パフォーマンス計測の実装
- **目的**: 最適化の効果測定
- **作業内容**:
  1. パフォーマンス計測ツールの設定
  2. ベースライン測定
  3. ボトルネックの特定

#### 最適化の実施
- **目的**: レンダリング効率の向上
- **作業内容**:
  1. メモ化の適用
     - useMemoを活用した計算結果のキャッシュ
     - computedプロパティの適切な使用
  2. 不要な再レンダリングの防止
     - コンポーネント設計の見直し
     - propsの最適化
  3. 静的アセットの最適化
     - 画像の最適化
     - アイコンのSVG化

## 最近の変更

### 2024-03-28
1. **キャリアセクションの正規化完了**
   - 正規化されたキャリアストア（`src/stores/normalized/career.ts`）の作成
   - キャリアデータ操作用コンポーザブル（`src/composables/useCareerData.ts`）の作成
   - `CareerSection.vue`と`CareerTimelineItem.vue`の更新
   - データ層とプレゼンテーション層の分離
   - リレーション管理の実装
   - 型安全性の向上

## 次のアクション
1. リアクティブ性能の最適化
   - 不要な再計算の防止
   - メモ化の適用
   - パフォーマンスの検証

## レビューチェックリスト

各作業完了時の品質確認項目:

- [ ] TypeScriptエラーがないこと
- [ ] ESLint警告がないこと
- [ ] 全テストが通過すること
- [ ] パフォーマンス指標が改善していること
- [ ] コードの重複が削減されていること
- [ ] 機能的な変更がないこと（同一動作の確認）

## 参考資料

- [Vue.js スタイルガイド](https://v3.ja.vuejs.org/style-guide/)
- [TypeScript ベストプラクティス](https://typescript-jp.gitbook.io/deep-dive/styleguide)
- [Pinia ドキュメント](https://pinia.vuejs.org/)
- [コンポーネント設計パターン](https://www.patterns.dev/vue)
