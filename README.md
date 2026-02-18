# Inflame App

[RAWG Video Games Database API](https://rawg.io/apidocs) を利用したゲーム検索・発見 SPA。

## 技術スタック

| カテゴリ | ライブラリ |
|---|---|
| フレームワーク | React 18 + TypeScript |
| ビルド | Vite 6 |
| ルーティング | react-router-dom v6 |
| スタイリング | styled-components v6 |
| アニメーション | framer-motion v12 |
| 状態管理 | React Context + useReducer |
| サニタイズ | DOMPurify |

## セットアップ

### 1. クローン & インストール

```bash
git clone <リポジトリURL>
cd inflame-app
npm install
```

### 2. 環境変数

プロジェクトルートに `.env` ファイルを作成する:

```
VITE_RAWG_API_KEY=your_api_key_here
```

APIキーは [rawg.io/apidocs](https://rawg.io/apidocs) から取得できる。

### 3. 起動

```bash
npm run dev
```

## コマンド

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバー起動 (Vite HMR) |
| `npm run build` | 型チェック + 本番ビルド |
| `npm run lint` | ESLint (警告ゼロ必須) |
| `npm run preview` | 本番ビルドのローカルプレビュー |

## ルート構成

| パス | ページ |
|---|---|
| `/` | ホーム |
| `/login` | ログイン |
| `/user` | ユーザープロフィール |
| `/game/:id` | ゲーム詳細 |
| `/search` | 検索結果 |
| `/:categoryId` | カテゴリ一覧 |

## ディレクトリ構成

```
src/
├── api/          # RAWG API エンドポイント定義
├── components/
│   ├── common/   # Layout、Header、Footer
│   ├── games/    # Carousel、GameItem、GamesList
│   ├── gameDetail/ # 詳細ページコンポーネント
│   └── ui/       # BookmarkBtn、アイコン、LoadingDots など
├── context/      # GamesContext (useReducer)
├── hooks/        # useGamesContext、useGames、useSearch
├── pages/        # ルートレベルのページコンポーネント
├── styles/       # GlobalStyles
├── types/        # TypeScript 型定義
└── utils/        # APIフェッチヘルパー
```
