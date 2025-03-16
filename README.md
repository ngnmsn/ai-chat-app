# AI Chat Application

このプロジェクトは、Next.js 15とAWS Bedrockを使用して構築されたAIチャットアプリケーションです。モダンなUIでAIとのシームレスな対話を実現します。

## 機能

- AIとのインタラクティブなチャット機能
- モダンなUIデザイン（Tailwind CSS使用）
- リアルタイムレスポンス
- レスポンシブデザイン（モバイル対応）
- マークダウン形式のメッセージ表示対応

## 技術スタック

- Next.js 15（App Router使用）
- React 19
- TypeScript
- Tailwind CSS
- AWS Bedrock
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
# AWS Bedrock設定
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
BEDROCK_AGENT_ID=your_bedrock_agent_id  # エージェント使用時のみ
BEDROCK_AGENT_ALIAS_ID=your_bedrock_agent_alias_id  # エージェント使用時のみ
```

4. 開発サーバーの起動:
```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。
