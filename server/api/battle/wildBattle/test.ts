import { fetchInitializedGameData } from "./fetchInitializedData";
import { gameHandler } from "./gameHandler";


const test = async () => {
    let initData = await fetchInitializedGameData("8d64b01c-4949-4cfd-a3ee-e5dd0d85d63e")

    console.log("コマンドを選択");
    console.log("サーバ側へ処理を移行");
    let turn = 1;
    for(let i = 1; i < 5; i++){
        console.log(i,"戦目");
        while(true){
            console.log("\n",turn,"ターン目\n");
            const action = {
                "action_id":1,
                "command_id":1
            };
            const result = await gameHandler(initData!.battlePokemons, initData!.wildPokemons,initData!.moves, action);
            if(result?.message){
                console.log(result.message);  
            }
            turn++;
            if(turn >= 10)break;
            if(result?.endFlag){
                turn = 0;
                console.log("バトル終了\n");
                break;
            }
        }
        initData = await fetchInitializedGameData("8d64b01c-4949-4cfd-a3ee-e5dd0d85d63e");
    }
}

test();

