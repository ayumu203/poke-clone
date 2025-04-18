import { gameHandler } from "./gameHandler";
import { initGameData } from "./fetchInitializedData";


const test = async () => {
    let initData = await initGameData("8d64b01c-4949-4cfd-a3ee-e5dd0d85d63e")

    console.log("コマンドを選択");
    console.log("サーバ側へ処理を移行");
    let turn = 1;
    for(let i = 1; i < 5; i++){
        console.log(i,"戦目");
        while(true){
            console.log("\n",turn,"ターン目\n");
            const random = Math.floor(Math.random() * 4 - 1) + 1;
            const action = {
                action_id: 1,
                command_id: random
            };
            const result = await gameHandler(initData!.battlePokemons, initData!.wildPokemons,initData!.moves, action);
            if(result?.buffer){
                console.log(result.buffer);  
            }
            turn++;
            // if(turn >= 5)break;
            if(result.endFlag){
                turn = 0;
                console.log("バトル終了\n");
                break;
            }
        }
        initData = await initGameData("8d64b01c-4949-4cfd-a3ee-e5dd0d85d63e");
    }
}

test();

