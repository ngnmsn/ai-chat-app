# AI Chat Application

このプロジェクトは、Next.js 15とOpenAI APIを使用して構築されたAIチャットアプリケーションです。

## 機能

- AIとのインタラクティブなチャット機能
- モダンなUIデザイン（Tailwind CSS使用）
- リアルタイムレスポンス

## 技術スタック

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- OpenAI API
- Radix UI Icons

## プロジェクト構成

```
├── eslint.config.mjs      # ESLint設定
├── next-env.d.ts         # Next.js用の型定義
├── next.config.ts        # Next.js設定
├── package.json          # プロジェクト依存関係
├── postcss.config.mjs    # PostCSS設定
├── public/              # 静的ファイル
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/                 # ソースコード
│   └── app/
│       ├── api/
│       │   └── chat/
│       │       └── route.ts  # チャットAPI実装
│       ├── favicon.ico
│       ├── globals.css      # グローバルスタイル
│       ├── layout.tsx       # レイアウトコンポーネント
│       └── page.tsx         # メインページ
├── tailwind.config.ts   # Tailwind CSS設定
└── tsconfig.json        # TypeScript設定
```

## 環境構築

1. リポジトリのクローン:
```bash
git clone [your-repository-url]
cd ai-chat-app
```

2. 依存パッケージのインストール:
```bash
npm install
```

3. 環境変数の設定:
`.env.local`ファイルをプロジェクトのルートに作成し、必要な環境変数を設定:
```
OPENAI_API_KEY=your_api_key_here
```

4. 開発サーバーの起動:
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。
