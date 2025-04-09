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
    /serverで以下を実行

## 起動
* 初回起動
    >$ docker compose up --build -d
* 起動
    >$ docker compose up -d
* データベース参照
    >$ docker exec -it poke-clone-server-1 /bin/bash
    ># npx prisma studio

## 今後の実装
### リファクタリング
* 現在特にclientのコードが乱れているためリファクタリングを行いたい.

#### client
* Header.tsx
ユーザへのメッセージ部分を変更
* FirstPokemon/page.tsx
処理が冗長化・読みづらい
* Login/page.tsx
ヘッダー・フッターの追加
* /page.tsx
ロジックの改善

#### server
* makeClientMove.ts,makeColientPokemon
なぞのtmpの変数名の変更
* /masterdata/Move
Moveのnullのハンドリング
* /move/move.ts
型に付属した余分なnullの削除

### ポケモンの技データの登録
* 現在のシステムではすべてのポケモンにmove_idの1と2が割り当てられている.(はたくとからてチョップだったきがする)
* そのため各ポケモンに割り当てる技データとpokemon_idをおよび理解のためpokemonのnameを記述したJSONファイルを自動生成できるようにする.
* server/api/masterdata/Pokemon/registerMove.tsにて実装
* 作業ブランチは/feature/register-pokemon-move
```json
// 凡例
{
    [
        {
            "pokemon_id":1,
            "name":"ビクティニ",
            "move1_id":1,
            "move2_id":2
        }
    ],
    [
        {
            "pokemon_id":2,
            "name":"ツタージャ",
            "move1_id":2,
            "move2_id":3,
        }
    ]
}
``` 