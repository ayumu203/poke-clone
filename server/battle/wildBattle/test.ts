import { gameHandler } from "./gameHandler";
import { initGameData } from "./gameInitializer";

const test = async () => {
    // プレイヤーのplayer_idを指定
    // 今回はplayer_id=100でテストデータを作成済み
    const initData = await initGameData("300");
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
    console.log("1:たたかう");
    console.log(initData.moves,"技1を選択");
    console.log("サーバ側へ処理を移行");
    let turn = 0;
    while(true){
        const result = await gameHandler(initData.battlePokemons,initData.wildPokemons,initData.moves,{action_id:1,command_id:1});
        turn++;
        if(turn > 15)break;
        if(result.endFlag === true){
            console.log("戦闘終了");
            break;
        }
    }
}

for(let i = 0; i < 3; i++){
    test();
}

