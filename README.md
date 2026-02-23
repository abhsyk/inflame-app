# Inflame App

[RAWG Video Games Database API](https://rawg.io/apidocs) を利用したゲーム検索・発見 SPAです。

## 技術スタック

| カテゴリ       | ライブラリ                 |
| -------------- | -------------------------- |
| フレームワーク | React 18 + TypeScript      |
| ビルド         | Vite 6                     |
| ルーティング   | react-router-dom v6        |
| スタイリング   | styled-components v6       |
| アニメーション | framer-motion v12          |
| 状態管理       | React Context + useReducer |
| 認証           | Firebase Authentication    |
| DB             | Cloud Firestore            |
| サニタイズ     | DOMPurify                  |

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
VITE_RAWG_API_KEY=your_rawg_api_key

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

- RAWG APIキーは [rawg.io/apidocs](https://rawg.io/apidocs) から取得
- Firebase設定値は [Firebase Console](https://console.firebase.google.com) → プロジェクトの設定 → マイアプリ から取得

#### Firebaseの事前設定

1. Authentication → ログイン方法で「メール/パスワード」「Google」を有効化
2. Firestore Database を作成し、以下のセキュリティルールを設定

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/bookmarks/{bookmarkId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 3. 起動

```bash
npm run dev
```

## コマンド

| コマンド          | 説明                                   |
| ----------------- | -------------------------------------- |
| `npm run dev`     | 開発サーバーを起動します (Vite HMR)    |
| `npm run build`   | 型チェック + 本番ビルドを実行します    |
| `npm run lint`    | ESLint を実行します (警告ゼロ必須)     |
| `npm run preview` | 本番ビルドをローカルでプレビューします |

## ルート構成

| パス           | ページ                         |
| -------------- | ------------------------------ |
| `/`            | ホーム                         |
| `/login`       | ログイン                       |
| `/signup`      | 新規登録                       |
| `/user`        | ブックマーク一覧（要ログイン） |
| `/game/:id`    | ゲーム詳細                     |
| `/search`      | 検索結果                       |
| `/:categoryId` | カテゴリ一覧                   |

## ディレクトリ構成

```
src/
├── api/          # RAWG API エンドポイント定義
├── components/
│   ├── common/   # Layout、Header、Footer
│   ├── games/    # Carousel、GameItem、GamesList
│   ├── gameDetail/ # 詳細ページコンポーネント
│   └── ui/       # BookmarkBtn、AuthErrorMessage、アイコン など
├── context/      # GamesContext (useReducer)
├── hooks/        # useGamesContext、useGames、useSearch
├── lib/          # Firebase初期化
├── pages/        # ルートレベルのページコンポーネント
├── services/     # authService、bookmarkService (Firebase操作)
├── styles/       # GlobalStyles
├── types/        # TypeScript 型定義
└── utils/        # APIフェッチヘルパー
```
