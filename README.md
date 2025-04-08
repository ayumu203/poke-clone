# Poke-clone

## 環境構築
1. Docker環境のインストール
1. >$ git clone git@github.com:ayumu203/poke-clon.git
1. /serverに.envを作成し以下の内容を貼り付ける
    > DATABASE_URL="postgresql://postgres:postgres@db:5432/postgres?schema=public"
1. /clientに.env.localを作成し,以下を貼り付ける
    >NEXT_PUBLIC_SUPABASE_URL=***
    >NEXT_PUBLIC_SUPABASE_ANON_KEY=***
    >NEXT_SUPABASE_URL=http://localhost:3000
1. /clientで以下を実行
    >$ npm install

## 起動
* 初回起動
    >$ docker compose up --build -d
* 起動
    >$ docker compose up -d
* データベース参照
    >$ docker exec -it poke-clone-server-1 /bin/bash
    ># npx prisma studio