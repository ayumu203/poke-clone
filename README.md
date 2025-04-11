# Poke-clone

## 環境構築
1. Docker環境のインストール
1. >$ git clone git@github.com:ayumu203/poke-clon.git
1. supabaseの登録,gcpの設定を行う.(supabase googleログイン等で調べると情報が出てきます)
1. /serverに.envを作成し以下の内容を貼り付ける
    > DATABASE_URL="postgresql://postgres:postgres@db:5432/ postgres?schema=public"
1. /clientに.env.localを作成し,以下を貼り付ける
NEXT_PUBLIC_SUPABASE_URL=*URL* \
NEXT_PUBLIC_SUPABASE_ANON_KEY=*ANON_KEY* \
NEXT_SUPABASE_URL=http://localhost:3000 \
NEXT_PUBLIC_API_URL=http://localhost:3001

1. /clientで以下を実行
    >$ npm install

## 起動
* 初回起動
    >$ docker compose up --build -d
* 起動
    >$ docker compose up -d
* データベース参照
    >$ docker exec -it poke-clone-server-1 /bin/bash \
    >\# npx prisma studio 

## 今後の実装

### ポケモンバトル
* 野生ポケモンとの戦闘を実装していく
* 一部のデータを変更する

### 再ロード時の処理(保留)
* 画面が再ロードされたときログイン画面へ遷移するようにする

### ポケモン進化先の確認データ(motoki)
* 以下より各ポケモンに進化先が存在するかを判定する
* 存在する場合はis_evolveをtrueに設定し、それ以外ではfalseにする
APIエンドポイント:https://pokeapi.co/api/v2/evolution-chain/{id}/

### ポケモンの技データの登録(motoki)
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

### リファクタリング
### 4/11追加
* moveスキーマにstatus_target:stringを追加
### 4/11時点で完了しています
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
* makeClientMove.ts,makeClientPokemon
なぞのtmpの変数名の変更
* /masterdata/Move
Moveのnullのハンドリング
* /move/move.ts
型に付属した余分なnullの削除
