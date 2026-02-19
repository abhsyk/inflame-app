# Inflame App

[RAWG Video Games Database API](https://rawg.io/apidocs) を利用したゲーム検索・発見 SPAです。

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

プロジェクトルートに `.env` ファイルを作成してください。

```
VITE_RAWG_API_KEY=your_api_key_here
```

APIキーは [rawg.io/apidocs](https://rawg.io/apidocs) から取得できます。

### 3. 起動

```bash
npm run dev
```

## コマンド

| コマンド | 説明 |
|---|---|
| `npm run dev` | 開発サーバーを起動します (Vite HMR) |
| `npm run build` | 型チェック + 本番ビルドを実行します |
| `npm run lint` | ESLint を実行します (警告ゼロ必須) |
| `npm run preview` | 本番ビルドをローカルでプレビューします |

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

## 注意事項

- **ブックマーク機能**：バックエンド・データベースを持たないデモ実装のため、ページリロードで初期化されます
- **ログイン機能**：UIデモ用のモック実装であり、実際の認証処理は行っていません
