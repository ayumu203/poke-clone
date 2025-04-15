import { gameHandler } from "./gameHandler";
import { initGameData, TestInitGameData } from "./gameInitializer";


const test = async () => {
    let initData = await TestInitGameData();

    console.log("コマンドを選択");
    console.log("サーバ側へ処理を移行");
    let turn = 1;
    for(let i = 1; i < 5; i++){
        console.log(i,"戦目");
        while(true){
            console.log("\n",turn,"ターン目\n");
            const random = Math.floor(Math.random() * 4 - 1) + 1;
            const result = await gameHandler(initData.battlePokemons,initData.wildPokemons,initData.moves,{action_id:1,command_id:random});
            turn++;
            // if(turn >= 5)break;
            if(result.endFlag){
                turn = 0;
                console.log("バトル終了\n");
                break;
            }
        }
        initData = await TestInitGameData();
    }
}

test();

