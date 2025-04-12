import { gameHandler } from "./handleGame";
import { initGame } from "./initGame";

const test = async () => {
    const initData = await initGame("85e20851-32f1-4c0c-9185-54900cfa0c7f");
    console.log(initData.wildPokemons[0].getName(),"があらわれた！");
    console.log("手持ちのポケモン:",initData.battlePokemons[0].getName());
    console.log("レベル",initData.battlePokemons[0].getLevel());
    console.log("HP",initData.battlePokemons[0].getCurrentHp());
    console.log("野生のポケモン:",initData.wildPokemons[0].getName());
    console.log("レベル",initData.wildPokemons[0].getLevel());
    console.log("HP",initData.wildPokemons[0].getCurrentHp());

    console.log("コマンドを選択");
    console.log("1:たたかう");
    console.log(initData.battlePokemons[0].getMove1Id(),"技1を選択");
    gameHandler(initData.battlePokemons,initData.wildPokemons,initData.moves,{action_id:1,command_id:1});
}

for(let i = 0; i < 1; i++){
    test();
}
