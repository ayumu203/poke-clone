import { gameHandler } from "./gameHandler";
import { initGameData } from "./gameInitializer";

const test = async () => {
    // プレイヤーのplayer_idを指定
    // 今回はplayer_id=100でテストデータを作成済み
    let initData = await initGameData("600");
    // T2
    // console.log("クライアントサイドの処理を擬似再現");
    // console.log(initData.wildPokemons[0].getName(),"があらわれた！");
    // console.log("手持ちのポケモン:",initData.battlePokemons[0].getName());
    // console.log("レベル",initData.battlePokemons[0].getLevel());
    // console.log("HP",initData.battlePokemons[0].getCurrentHp());
    // console.log("野生のポケモン:",initData.wildPokemons[0].getName());
    // console.log("レベル",initData.wildPokemons[0].getLevel());
    // console.log("HP",initData.wildPokemons[0].getCurrentHp());

    console.log("コマンドを選択");
    console.log("サーバ側へ処理を移行");
    let turn = 0;
    for(let i = 1; i < 5; i++){
        console.log(i,"戦目");
        while(true){
            const random = Math.floor(Math.random() * 10 - 1) + 1;
            const result = await gameHandler(initData.battlePokemons,initData.wildPokemons,initData.moves,{action_id:1,command_id:random});
            turn++;
            // if(turn >= 5)break;
            if(result.endFlag){
                console.log("バトル終了");
                break;
            }
        }
        initData = await initGameData("600");
    }
}

test();

