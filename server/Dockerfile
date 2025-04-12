FROM node:18-bullseye

WORKDIR /app

# package.json だけ先にコピーしてキャッシュを活かす
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリ全体をコピー
COPY . .

# Prismaのコードを生成
RUN npx prisma generate

# 必要であればマイグレーション（開発用なら不要）
# RUN npx prisma migrate deploy

EXPOSE 3001

# devを実行するだけにする。generateやmigrateはイメージ作成時に済ませるのが一般的
CMD ["npm", "run", "dev"]
