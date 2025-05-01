# Poke-clone

## 環境構築
1. Docker環境のインストール
1. >$ git clone git@github.com:ayumu203/poke-clone.git
1. supabaseの登録,gcpの設定を行う.(supabase googleログイン等で調べると情報が出てきます)
1. /serverに.envを作成し以下の内容を貼り付ける
    > DATABASE_URL="postgresql://postgres:postgres@db:5432/ postgres?schema=public"
1. /clientに.env.localを作成し,以下を貼り付ける \
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

### ポケモンバトル(arm) | feature/server/battle
* 「つかまえる」の実装
* 相手ポケモンの技のランダム化
* リザルト画面の作成

### 再ロード時の処理(完了)
* 画面が再ロードされたときログイン画面へ遷移するようにする

### 技データの不足点(完成後実装)
* 回数技・特殊な技は実装無理、、、

### ポケモン進化先の確認データ(motoki)
* 以下より各ポケモンに進化先が存在するかを判定する
* 存在する場合はis_evolveを進化するレベルに設定し、それ以外では-1にする
APIエンドポイント:https://pokeapi.co/api/v2/evolution-chain/{id}/

### ポケモンの技データの登録(arm)
* <font color="orange">仕様を変更して実装</font>
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
            "move_id":[1,4,7,9,20....]
        }
    ],
    [
        {
            "pokemon_id":2,
            "name":"ツタージャ",
            "move_list":[1,2,3,4....]
        }
    ]
}
``` 

# 進捗
## はじめてのぽけもん
![image](https://github.com/user-attachments/assets/4c5adf0b-de03-4966-9f6e-d085c8cf7a1a)

## ほーむ
![image](https://github.com/user-attachments/assets/07ce6f5e-d18c-4d40-919b-31c705451f6a)

## ポケモン情報
![image](https://github.com/user-attachments/assets/1fe0ba53-8c97-4d7c-b59e-4f7e2b88bf6e)

## ポケモンバトル
![image](https://github.com/user-attachments/assets/5d12e7bf-f223-47e5-a2fa-141aa952c4e5)
