# my-folio プロジェクトディレクトリ構造

```
my-folio/
├── .cursor/              - Cursor IDE設定
├── .git/                 - Gitリポジトリ
├── .github/              - GitHub関連設定
├── .vscode/              - VS Code設定
├── dist/                 - ビルド生成物
├── doc/                  - ドキュメント
│   ├── directorystructure.md            - ディレクトリ構造説明(本ファイル)
│   └── my-folioリファクタリング進捗管理.md  - リファクタリング進捗管理
├── node_modules/         - npm依存関係
├── public/               - 静的ファイル
│   ├── img/              - 画像ファイル
│   ├── models/           - 3Dモデルファイル
│   └── textures/         - テクスチャファイル
├── src/                  - ソースコード
│   ├── assets/           - アセットファイル
│   ├── components/       - コンポーネント
│   │   ├── babylon/      - 3D関連コンポーネント
│   │   ├── global/       - グローバルコンポーネント
│   │   ├── home/         - ホーム画面コンポーネント
│   │   │   ├── parts/    - 小さなコンポーネントパーツ
│   │   │   │   ├── CareerTimelineItem.vue - キャリアタイムラインアイテム
│   │   │   │   ├── GalleryCard.vue        - ギャラリーカード
│   │   │   │   ├── HomeHeader.vue         - ホームヘッダー
│   │   │   │   ├── ProjectCard.vue        - プロジェクトカード
│   │   │   │   └── SkillChart.vue         - スキルチャート
│   │   │   └── section/ - セクションコンポーネント
│   │   │       ├── AboutSection.vue       - 自己紹介セクション
│   │   │       ├── BlogSection.vue        - ブログセクション
│   │   │       ├── CarrerSection.vue      - キャリアセクション
│   │   │       ├── GallerySection.vue     - ギャラリーセクション
│   │   │       ├── ProjectSection.vue     - プロジェクトセクション
│   │   │       └── SkillSection.vue       - スキルセクション
│   │   └── project/      - プロジェクト関連コンポーネント
│   ├── composables/      - コンポーザブル関数
│   │   ├── useProjectData.ts - プロジェクトデータ取得
│   │   └── useTranslation.ts - 翻訳機能
│   ├── locales/          - 多言語対応ファイル
│   │   ├── __tests__/    - テストファイル
│   │   ├── about.ts      - 自己紹介の翻訳
│   │   ├── career.ts     - キャリアの翻訳
│   │   ├── common.ts     - 共通の翻訳
│   │   ├── error.ts      - エラーの翻訳
│   │   ├── gallery.ts    - ギャラリーの翻訳
│   │   ├── galleryData.ts - ギャラリーデータ
│   │   ├── index.ts      - エントリーポイント
│   │   ├── languageSwitch.ts - 言語切り替え
│   │   ├── navigation.ts - ナビゲーションの翻訳
│   │   ├── project.ts    - プロジェクトの翻訳
│   │   ├── projectData.ts - プロジェクトデータ
│   │   ├── projectDetail.ts - プロジェクト詳細の翻訳
│   │   ├── skill.ts      - スキルの翻訳
│   │   └── types.ts      - 型定義
│   ├── plugins/          - プラグイン設定
│   │   └── vuetify.ts    - Vuetify設定
│   ├── router/           - ルーティング設定
│   │   └── index.ts      - ルーター設定
│   ├── stores/           - Piniaストア
│   │   ├── migrations/   - データ移行処理
│   │   ├── normalized/   - 正規化されたストア
│   │   │   ├── __tests__/ - テストファイル
│   │   │   ├── initializeStores.ts - ストア初期化
│   │   │   └── project.ts - 正規化されたプロジェクトストア
│   │   ├── auth.ts       - 認証ストア
│   │   ├── career.ts     - キャリアストア
│   │   ├── gallery.ts    - ギャラリーストア
│   │   ├── language.ts   - 言語ストア
│   │   ├── navigation.ts - ナビゲーションストア
│   │   ├── project.ts    - プロジェクトストア
│   │   ├── scroll.ts     - スクロールストア
│   │   ├── skill.ts      - スキルストア
│   │   └── social.ts     - ソーシャルリンクストア
│   ├── utils/            - ユーティリティ
│   │   ├── errorHandling.ts - エラーハンドリング
│   │   ├── logger.ts     - ロガー
│   │   └── typeCheck.ts  - 型チェック
│   ├── views/            - 画面コンポーネント
│   │   ├── BabylonFolioView.vue - 3Dフォリオビュー
│   │   ├── ForbiddenView.vue    - アクセス制限ビュー
│   │   ├── HomeView.vue         - ホーム画面
│   │   └── ProjectDetailView.vue - プロジェクト詳細画面
│   ├── App.vue           - アプリケーションルートコンポーネント
│   ├── main.ts           - アプリケーションエントリーポイント
│   └── .DS_Store         - macOSのファイル情報
├── .DS_Store             - macOSのファイル情報
├── .env                  - 環境変数
├── .eslintrc.cjs         - ESLint設定
├── .gitignore            - Git除外設定
├── .prettierrc.json      - Prettier設定
├── README.md             - プロジェクト説明
├── env.d.ts              - 環境変数の型定義
├── index.html            - HTMLエントリーポイント
├── package-lock.json     - npmロックファイル
├── package.json          - npm設定・依存関係
├── tsconfig.app.json     - TypeScriptアプリ設定
├── tsconfig.json         - TypeScript基本設定
├── tsconfig.node.json    - TypeScriptノード設定
├── vite.config.ts        - Vite設定
├── vitest.config.ts      - Vitestテスト設定
└── vitest.setup.ts       - Vitestセットアップ
```

## 主要なディレクトリとファイルの説明

### src/components
- **babylon/**: 3D関連コンポーネント（リファクタリング対象外）
- **global/**: 共通で使用されるグローバルコンポーネント
- **home/**: ホーム画面で使用されるコンポーネント
  - **parts/**: 小さな再利用可能なコンポーネント
  - **section/**: ホーム画面の各セクションコンポーネント
- **project/**: プロジェクト詳細に関連するコンポーネント

### src/composables
- **useProjectData.ts**: プロジェクトデータ取得のためのコンポーザブル
- **useTranslation.ts**: 翻訳機能のためのコンポーザブル

### src/stores
- **normalized/**: 正規化されたデータストア（リファクタリング中）
- **auth.ts**: 認証状態管理
- **career.ts**: キャリア情報管理
- **gallery.ts**: ギャラリーデータ管理
- **language.ts**: 言語設定と翻訳管理
- **project.ts**: プロジェクト情報管理
- **scroll.ts**: スクロール状態管理
- **skill.ts**: スキル情報管理
- **social.ts**: ソーシャルリンク管理

### src/utils
- **errorHandling.ts**: エラーハンドリングユーティリティ
- **logger.ts**: ロギングユーティリティ
- **typeCheck.ts**: 型チェックユーティリティ

---

# リファクタリング完了後の推奨ディレクトリ構造（静的ポートフォリオサイト用）

リファクタリング計画がすべて完了した時点での、静的ポートフォリオサイトに最適化したディレクトリ構造を以下に示します。

```
my-folio/
├── doc/                  - ドキュメント
│   ├── architecture/     - アーキテクチャ設計書
│   └── component/        - コンポーネント仕様書
├── public/               - 静的ファイル
│   ├── img/              - 最適化された画像ファイル
│   ├── models/           - 3Dモデルファイル
│   └── icons/            - アイコンファイル
├── src/                  - ソースコード
│   ├── assets/           - アセットファイル（処理が必要なもの）
│   ├── components/       - 再利用可能なコンポーネント
│   │   ├── atoms/        - 最小単位のコンポーネント
│   │   │   ├── buttons/  - ボタン関連コンポーネント
│   │   │   ├── inputs/   - 入力関連コンポーネント
│   │   │   └── displays/ - 表示関連コンポーネント
│   │   ├── molecules/    - 複合コンポーネント
│   │   │   ├── cards/    - カード関連コンポーネント
│   │   │   ├── forms/    - フォーム関連コンポーネント
│   │   │   └── lists/    - リスト関連コンポーネント
│   │   ├── organisms/    - 機能単位のコンポーネント
│   │   │   ├── headers/  - ヘッダー関連コンポーネント
│   │   │   ├── sections/ - セクション関連コンポーネント
│   │   │   └── modals/   - モーダル関連コンポーネント
│   │   ├── templates/    - ページレイアウトテンプレート
│   │   └── babylon/      - 3D関連コンポーネント (リファクタリング対象外)
│   ├── composables/      - 再利用可能なロジック
│   │   ├── data/         - データ操作ロジック
│   │   │   ├── useProjectData.ts - プロジェクトデータ取得
│   │   │   ├── useSkillData.ts   - スキルデータ取得
│   │   │   ├── useGalleryData.ts - ギャラリーデータ取得
│   │   │   └── useCareerData.ts  - キャリアデータ取得
│   │   ├── ui/           - UI操作ロジック
│   │   │   ├── useDisclosure.ts  - 開閉状態管理
│   │   │   └── useScrollEffect.ts - スクロール効果
│   │   └── utils/        - ユーティリティロジック
│   │       ├── useTranslation.ts - 翻訳機能
│   │       └── useValidation.ts  - バリデーション
│   ├── i18n/             - 国際化対応
│   │   ├── config.ts     - i18n設定
│   │   ├── index.ts      - エントリーポイント
│   │   └── locales/      - 翻訳ファイル
│   │       ├── en/       - 英語翻訳
│   │       │   ├── common.json   - 共通翻訳
│   │       │   ├── project.json  - プロジェクト翻訳
│   │       │   ├── skill.json    - スキル翻訳
│   │       │   └── ...
│   │       └── ja/       - 日本語翻訳
│   │           ├── common.json   - 共通翻訳
│   │           ├── project.json  - プロジェクト翻訳
│   │           ├── skill.json    - スキル翻訳
│   │           └── ...
│   ├── layouts/          - アプリケーションレイアウト
│   │   └── DefaultLayout.vue - デフォルトレイアウト
│   ├── pages/            - ページコンポーネント
│   │   ├── HomePage.vue       - ホームページ
│   │   ├── ProjectPage.vue    - プロジェクト一覧ページ
│   │   ├── ProjectDetailPage.vue - プロジェクト詳細ページ
│   │   ├── GalleryPage.vue    - ギャラリーページ
│   │   ├── BabylonFolioPage.vue - 3Dフォリオページ
│   │   └── NotFoundPage.vue   - 404ページ
│   ├── plugins/          - プラグイン設定
│   │   ├── vuetify.ts    - Vuetify設定
│   │   └── vueRouter.ts  - Vue Router設定
│   ├── router/           - ルーティング設定
│   │   ├── index.ts      - メインルーター
│   │   └── routes/       - ルート定義
│   │       └── main.ts   - メインルート
│   ├── stores/           - Piniaストア
│   │   ├── models/       - データモデル定義
│   │   │   ├── project.ts   - プロジェクトモデル
│   │   │   ├── skill.ts     - スキルモデル
│   │   │   ├── gallery.ts   - ギャラリーモデル
│   │   │   └── career.ts    - キャリアモデル
│   │   ├── modules/      - 機能別ストアモジュール
│   │   │   ├── language.ts  - 言語設定ストア
│   │   │   ├── navigation.ts - ナビゲーションストア
│   │   │   └── scroll.ts    - スクロールストア
│   │   └── entities/     - 正規化されたエンティティストア
│   │       ├── projectStore.ts - プロジェクトエンティティ
│   │       ├── skillStore.ts   - スキルエンティティ
│   │       ├── galleryStore.ts - ギャラリーエンティティ
│   │       └── careerStore.ts  - キャリアエンティティ
│   ├── types/            - TypeScript型定義
│   │   ├── models.ts     - データモデルの型
│   │   ├── components.ts - コンポーネントPropsの型
│   │   └── i18n.ts       - 国際化関連の型
│   ├── utils/            - ユーティリティ関数
│   │   ├── logger/       - ロギングユーティリティ
│   │   │   ├── index.ts     - ロガーエントリーポイント
│   │   │   └── formatter.ts - ログフォーマッター
│   │   ├── error/        - エラーハンドリングユーティリティ
│   │   │   ├── index.ts     - エラーハンドラーエントリーポイント
│   │   │   └── types.ts     - エラー型定義
│   │   ├── validators/   - バリデーションユーティリティ
│   │   └── formatters/   - フォーマッターユーティリティ
│   ├── App.vue           - アプリケーションルートコンポーネント
│   └── main.ts           - アプリケーションエントリーポイント
├── tests/                - テストファイル
│   └── unit/             - ユニットテスト
│       ├── components/   - コンポーネントテスト
│       ├── composables/  - コンポーザブルテスト
│       ├── stores/       - ストアテスト
│       └── utils/        - ユーティリティテスト
├── .env                  - 環境変数（開発環境）
├── .env.production       - 環境変数（本番環境）
├── .eslintrc.cjs         - ESLint設定
├── .gitignore            - Git除外設定
├── .prettierrc.json      - Prettier設定
├── README.md             - プロジェクト説明
├── tsconfig.json         - TypeScript基本設定
├── vite.config.ts        - Vite設定
└── vitest.config.ts      - Vitestテスト設定
```

## リファクタリング完了後のディレクトリ構造のポイント（静的サイト向け）

### 1. 不要な機能の削除
- **API関連ディレクトリを削除**: 静的サイトではAPI通信が不要
- **認証関連ストアを削除**: 静的ポートフォリオでは認証機能が不要
- **管理画面関連のファイルを削除**: 静的表示のみなので管理画面は不要
- **複雑なテスト構成を簡素化**: 必要最小限のユニットテストに絞る

### 2. コンポーネント設計の改善
- **Atomic Designパターンの採用**:
  - **atoms**: ボタン、入力フィールドなどの最小単位のコンポーネント
  - **molecules**: 複数のatomsを組み合わせた再利用可能なコンポーネント
  - **organisms**: ドメイン特化の機能コンポーネント
  - **templates**: ページレイアウトのテンプレート

### 3. 責務の明確な分離
- **pages**: ルートに紐づくページコンポーネント（ビュー）
- **layouts**: ページのレイアウト構造を提供
- **composables**: 再利用可能なロジック（ドメイン別に整理）
- **stores**: データ管理（モデル定義、機能モジュール、正規化エンティティに分離）

### 4. i18n構造の改善
- JSON形式への移行によるメンテナンス性向上
- 言語ごとのディレクトリ分離による整理

### 5. 型システムの強化
- 専用の`types`ディレクトリによる型定義の集約
- コンポーネントとデータモデルの型連携強化

このディレクトリ構造は、静的なポートフォリオサイトに必要な機能に絞りながらも、Vue.jsのベストプラクティスとAtomicデザインパターンに従い、スケーラブルで保守しやすいアプリケーション開発をサポートします。
