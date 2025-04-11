FROM node:18-bullseye

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

COPY . .

EXPOSE 3001

CMD ["sh", "-c", "npm run dev"]
