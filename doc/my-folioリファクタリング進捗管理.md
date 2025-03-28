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

### プロジェクト構造
```
src/
├── assets/       - 静的ファイル
├── components/   - コンポーネント
│   ├── babylon/  - 3D関連コンポーネント
│   ├── global/   - グローバルコンポーネント
│   ├── home/     - ホーム画面コンポーネント
│   └── project/  - プロジェクト関連コンポーネント
├── locales/      - 多言語対応ファイル
├── plugins/      - プラグイン設定
├── router/       - ルーティング設定
├── stores/       - Piniaストア
└── views/        - 画面コンポーネント
```

### 現状の課題
1. 型安全性が不十分（`@ts-ignore`の多用）
2. i18n実装が複雑で拡張性に欠ける
3. コンポーネントの責務が大きすぎる
4. ストア実装が複雑で保守が難しい
5. 認証ロジックが未整理
6. テスト不足
7. エラーハンドリングが不十分
8. パフォーマンス最適化余地あり

## リファクタリングの範囲

### 対象外
- **babylonJS関連**: `src/components/babylon/` ディレクトリ内の3D関連コンポーネントは、専門性が高く独立した機能のため、現時点でのリファクタリング作業の対象外とします。

## リファクタリング作業ステップと進捗状況

### 現在のフェーズ: ストア構造の改善
**進行中のタスク**: Props/Emitsパターンの適用による依存関係の整理

### 1. 型定義の改善 (90% 完了)
- **作業ブランチ**: `refactor/improve-typescript-types`
- **目標**: TypeScriptの型安全性を高め、`@ts-ignore`を削減する
- **進捗状況**:
  - [x] 翻訳データの型定義を厳密化
  - [x] ユーティリティ型を活用した型推論の強化
  - [x] 型チェックの強化とエラー検出の改善
  - [ ] Zod/io-tsなどのバリデーションライブラリ導入検討（保留）

### 2. 開発時のエラー検出と防止の強化 (100% 完了)
- **作業ブランチ**: `feature/improve-error-handling`
- **目標**: 開発時の問題を早期に発見し、品質を向上させる
- **進捗状況**:
  - [x] エラーログ収集の実装
  - [x] 型チェックの強化
  - [x] エラーハンドリングの改善
  - [x] デバッグログの充実化

### 3. ストアの構造改善 (25% 進行中)
- **作業ブランチ**: `refactor/improve-store-structure`
- **目標**: データ管理の単純化と効率化
- **進捗状況**:
  - [x] ストア構造の分析と課題の特定
  - [ ] Props/Emitsパターンの適用 (進行中)
  - [ ] 正規化されたデータ構造の採用
  - [ ] リアクティブ性能の最適化

### 4. コンポーネント設計の改善 (計画中)
- **作業ブランチ**: `refactor/improve-component-design`
- **目標**: 単一責任の原則に沿った再利用可能なコンポーネント構成
- **計画**:
  - [ ] 大きなコンポーネント（特にHomeView）の分割
  - [ ] Compositionによるロジック分離の促進
  - [ ] Atomic Designパターンの適用検討
  - [ ] コンポーネント間のデータフロー最適化

### 5. 国際化（i18n）システムの改善 (計画中)
- **作業ブランチ**: `refactor/improve-i18n`
- **目標**: 複雑な翻訳ロジックを簡素化し保守性を高める
- **計画**:
  - [ ] vue-i18nなど標準的なi18nライブラリの採用検討
  - [ ] 翻訳キー構造の整理と一貫性確保
  - [ ] 翻訳データのモジュール分割とオンデマンドロード
  - [ ] `t`関数のリファクタリングによる条件分岐の削減

### 6. テスト導入 (計画中)
- **作業ブランチ**: `feature/add-tests`
- **目標**: コード品質と信頼性の向上
- **計画**:
  - [ ] Vitestによるユニットテスト導入
  - [ ] Vue Testing Libraryによるコンポーネントテスト
  - [ ] Cypressによる主要フローのE2Eテスト
  - [ ] テストカバレッジの設定と監視

### 7. パフォーマンス最適化 (計画中)
- **作業ブランチ**: `refactor/optimize-performance`
- **目標**: 初期ロード時間の短縮とUX向上
- **計画**:
  - [ ] コンポーネントの遅延ロード適用
  - [ ] 画像の最適化
  - [ ] バンドルサイズ分析と削減
  - [ ] メモ化による不要な再計算防止

## 最近の変更
1. ストア構造の改善フェーズを開始
   - Props/Emitsパターンの採用を決定
   - 翻訳機能からの段階的な移行を計画

2. エラー検出と防止の強化が完了
   - エラーログ収集の実装
   - 型チェックの強化
   - デバッグログの充実化

## 次のアクション
1. Props/Emitsパターンの適用
   - 翻訳関連の型定義の作成
   - コンポーネントの依存関係の整理
   - テストケースの更新

2. データ構造の正規化
   - ストア間のデータ重複の排除
   - 参照関係の整理

3. リアクティブ性能の最適化
   - 不要な再計算の防止
   - メモ化の適用

## 注意点
- 各フェーズでの変更は段階的に行い、既存機能への影響を最小限に抑える
- 重要な変更前には必ずレビューを実施
- パフォーマンスへの影響を継続的に監視

## 優先順位と実装計画

### フェーズ1（基盤改善）: 2週間
1. 型定義の改善
2. 国際化システムの改善
3. エラーハンドリングの基盤構築

### フェーズ2（構造改善）: 3週間
1. ストアの構造改善
2. コンポーネント設計の改善
3. ビジネスロジックとUIの分離

### フェーズ3（品質向上）: 2週間
1. テスト導入
2. パフォーマンス最適化
3. API通信の抽象化

### フェーズ4（完成度向上）: 1週間
1. ルーティングとナビゲーションの整理
2. ドキュメント整備
3. 最終調整

## 進捗管理

### 完了タスク
- [x] プロジェクト現状分析
- [x] リファクタリング計画立案
- [x] 型定義改善: 翻訳データの型定義厳密化
- [x] `t`関数のリファクタリングによる条件分岐の削減
- [x] バリデーション層の設計と実装
  - [x] バリデーションルールの定義
  - [x] エラーメッセージの構造化
  - [x] 実行時型チェックの実装
  - [x] バリデーションテストの作成
- [x] 型システムの再設計
  - [x] 各翻訳ファイルの構造分析と共通パターンの特定
  - [x] インデックスシグネチャを含む型の階層構造の再設計
  - [x] 型の再利用性と拡張性の向上
- [x] 翻訳関連ファイルの型定義更新
  - [x] common.ts: 共通翻訳の型定義を改善
  - [x] navigation.ts: NavigationTranslationItemの適用
  - [x] project.ts: StatusTranslationItemの適用
  - [x] projectData.ts: NumericKeyTranslationItemとProjectTranslationItemの適用
  - [x] projectDetail.ts: 複合的な型定義の適用
  - [x] skill.ts: CategoryTranslationItemの適用
  - [x] career.ts: 複数の型定義の組み合わせ適用
  - [x] gallery.ts: BaseTranslationItemの適用
  - [x] galleryData.ts: NumericKeyTranslationItemの適用
  - [x] languageSwitch.ts: BaseTranslationItemの適用
  - [x] 翻訳キー構造の整理と一貫性確保
    - [x] 一貫性のある命名規則の適用（機能的なグループ化、明確な階層構造）
    - [x] 階層構造の最適化（関連する翻訳キーのグループ化、共通機能の分類）
    - [x] 重複の排除（共通翻訳キーの適切な配置、バリデーションメッセージの一元管理）
    - [x] 型定義の改善（JSDocコメントの追加、型の意図を明確にする命名）
- [x] GastronomeJourneyDetail.vueの型定義強化
  - [x] セクションタイプの型定義（SectionType）
  - [x] 翻訳キーの型定義（TranslationKey, TranslationSubKey）
  - [x] 機能アイコンの型定義（FeatureKey, FeatureIconMap）
  - [x] 画像設定の型固定（as const）
  - [x] getTranslation関数の型安全性向上
- [x] プロジェクト関連コンポーネントの型定義強化
  - [x] ProjectSection.vueの型定義更新
    - [x] Project型のインポートと適用
    - [x] レイアウト設定の型定義（LayoutConfig）
  - [x] ProjectCard.vueの型定義更新
    - [x] Propsインターフェースの定義
    - [x] SectionName型の適用
    - [x] 翻訳関数の型安全性向上
    - [x] テンプレートの翻訳呼び出しを統一
  - [x] セクションコンポーネントの型定義強化
    - [x] AboutSection.vueの型定義更新
      - [x] Translationsインターフェースの定義
      - [x] LogoConfigインターフェースの定義
      - [x] LayoutConfigインターフェースの定義
      - [x] getTranslation関数の型安全性向上
      - [x] スタイルのバインディングをレイアウト設定に統一
    - [x] SkillSection.vueの型定義更新
      - [x] CategorySkillインターフェースの定義
      - [x] LayoutConfigインターフェースの定義
      - [x] categoriesをreadonlyに設定
      - [x] getTranslation関数の型安全性向上
      - [x] スタイルのバインディングをレイアウト設定に統一
    - [x] CarrerSection.vueの型定義更新
      - [x] LayoutConfigインターフェースの定義（レスポンシブ対応）
      - [x] CategoryItemインターフェースの定義
      - [x] getTranslation関数の型安全性向上
      - [x] computed戻り値の型指定
      - [x] スタイルのバインディングをレイアウト設定に統一
    - [x] GallerySection.vueの型定義更新
      - [x] LayoutConfigインターフェースの定義（レスポンシブ対応）
      - [x] Translationsインターフェースの定義
      - [x] computedプロパティの型指定
      - [x] getTranslation関数の型安全性向上
      - [x] スタイルのバインディングをレイアウト設定に統一
- [x] CareerTimelineItem.vueの型定義強化
  - [x] Props型の定義とreadonly修飾子の適用
  - [x] 日付フォーマット関連の型定義（MonthName, DateParts）
  - [x] レイアウト設定の型定義（LayoutConfig）
  - [x] 翻訳関数の型安全性向上
- [x] GalleryCard.vueの型定義強化
  - [x] Props型の定義とreadonly修飾子の適用
  - [x] AIモデル関連の型定義（AIModel, AIModelColor, AIModelConfig）
  - [x] レイアウト設定の型定義（LayoutConfig）
  - [x] 翻訳関数の型安全性向上
- [x] コンポーネントのprops/emits型定義の強化
  - [x] 共通コンポーネントの型定義更新
    - [x] SkillChart.vueの型定義更新
      - [x] Props型の定義とreadonly修飾子の適用
      - [x] チャートオプションの型定義（ApexOptions）
      - [x] レイアウト設定の型定義（LayoutConfig）
      - [x] 翻訳関数の型安全性向上
    - [x] CareerTimelineItem.vueの型定義更新（CareerCard.vueの実装）
      - [x] Props型の定義とreadonly修飾子の適用
      - [x] 日付フォーマット関連の型定義（MonthName, DateParts）
      - [x] レイアウト設定の型定義（LayoutConfig）
      - [x] 翻訳関数の型安全性向上
    - [x] GalleryCard.vueの型定義更新
      - [x] Props型の定義とreadonly修飾子の適用
      - [x] AIモデル関連の型定義（AIModel, AIModelColor, AIModelConfig）
      - [x] レイアウト設定の型定義（LayoutConfig）
      - [x] 翻訳関数の型安全性向上
- [x] 多言語対応のテストケース追加
  - [x] 共通翻訳のテスト
  - [x] ナビゲーション翻訳のテスト
  - [x] プロジェクト翻訳のテスト
  - [x] スキル翻訳のテスト
  - [x] エラーメッセージ翻訳のテスト
- [x] エラーハンドリングの基盤構築
  - [x] グローバルエラーハンドリングの設計と実装
  - [x] エラーメッセージの多言語対応実装
- [x] 開発時のエラー検出と防止の強化
  - [x] 静的解析の強化
    - [x] ESLintルールの最適化（より厳密なルールを適用）
    - [x] TypeScriptの厳密な型チェック設定（strict modeと追加のチェックを有効化）
  - [x] 検出されたエラーの修正
    - [x] 未使用変数の削除（createCamera.ts, ProjectDetailView.vue）
    - [x] モジュール参照の修正（BlogSection.vueのblogdata.json参照を削除）
    - [x] 暗黙的なany型の修正（BlogSection.vueの型定義追加）
  - [x] 開発時のエラーログ収集
    - [x] コンソールログの体系化
    - [x] 型エラーの早期検出の仕組み構築

### 進行中タスク
- [ ] ストアの構造改善
  - [ ] Props/Emitsパターンの適用
    - [ ] 翻訳関連の型定義の作成
    - [ ] コンポーネントの依存関係の整理
    - [ ] テストケースの更新
  - [ ] データ構造の正規化
    - [ ] プロジェクトデータの分離
    - [ ] 翻訳データの構造化
  - [ ] リアクティブ性能の最適化
    - [ ] computedプロパティの見直し
    - [ ] メモ化の適用

### 次のアクション
1. Props/Emitsパターンの適用
   - 翻訳関連の型定義の作成
   - コンポーネントの依存関係の整理
   - テストケースの更新

### 最近の変更（2024-03-27）
1. **開発時のエラーログ収集の実装完了**
   - ロガーユーティリティの作成（logger.ts）
     - ログレベルの定義
     - 構造化されたログメッセージ
     - 開発環境と本番環境の出力制御
   - 型チェックユーティリティの作成（typeCheck.ts）
     - オブジェクト型の検証
     - 配列型の検証
     - 列挙型の検証
     - エラーメッセージの多言語対応
   - language.tsのエラーログ処理を改善
     - 構造化されたエラーログの出力
     - コンテキスト情報の追加

2. **ストアの構造改善の方針決定**
   - Props/Emitsパターンの採用を決定
     - 型安全性の向上
     - テストの容易性
     - 明確なデータフロー
     - コンポーネントの独立性確保

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
