import { BattlePokemon } from "../class/BattlePokemon.class";
import { Move } from "../types/move.type";


export const handleStatusRank = (user:BattlePokemon[],opponent:BattlePokemon[],move:Move) => {
    console.log(user[0].getName(),"は",move?.name,"をつかった");
    switch(move!.move_category){
        case "damage+raise":
        for(let i = 0; i < move!.status_name.length; i++){
            const statusName = move!.status_name[i];
            const statusRank = move!.status_rank[i];
            switch(statusName){
                case "attack":
                    user[0].getRank().setAttackRank(user[0].getRank().getAttackRank() + statusRank);
                    break;
                case "defense":
                    user[0].getRank().setDefenseRank(user[0].getRank().getDefenseRank() + statusRank);
                    break;
                case "special_attack":   
                    user[0].getRank().setSpecialAttackRank(user[0].getRank().getSpecialAttackRank() + statusRank);
                    break;
                case "special_defense":
                    user[0].getRank().setSpecialDefenseRank(user[0].getRank().getSpecialDefenseRank() + statusRank);
                    break;
                case "speed":
                    user[0].getRank().setSpeedRank(user[0].getRank().getSpeedRank() + statusRank);
                    break;
                case "accuracy":
                    user[0].getRank().setAccuracyRank(user[0].getRank().getAccuracyRank() + statusRank);
                    break;
            }
        }
        console.log(user[0].getName(),"は",move!.name,"をつかった,");
        for(let i = 0; i < move!.status_name.length; i++){
            console.log(move!.status_name[i],"が",move!.status_rank[i]);
        }
        console.log("変化した");
        break;
        case "damage+lower":
        for(let i = 0; i < move!.status_name.length; i++){  
            const statusName = move!.status_name[i];
            const statusRank = move!.status_rank[i];
            switch(statusName){
                case "attack":
                    opponent[0].getRank().setAttackRank(opponent[0].getRank().getAttackRank() - statusRank);
                    break;
                case "defense":
                    opponent[0].getRank().setDefenseRank(opponent[0].getRank().getDefenseRank() - statusRank);
                    break;
                case "special_attack":   
                    opponent[0].getRank().setSpecialAttackRank(opponent[0].getRank().getSpecialAttackRank() - statusRank);
                    break;
                case "special_defense":
                    opponent[0].getRank().setSpecialDefenseRank(opponent[0].getRank().getSpecialDefenseRank() - statusRank);
                    break;
                case "speed":
                    opponent[0].getRank().setSpeedRank(opponent[0].getRank().getSpeedRank() - statusRank);
                    break;
                case "accuracy":
                    opponent[0].getRank().setAccuracyRank(opponent[0].getRank().getAccuracyRank() - statusRank);
                    break;
            }
        }
        console.log(user[0].getName(),"は",move!.name,"をつかった,");
        console.log(opponent[0].getName(),"の");
        for(let i = 0; i < move!.status_name.length; i++){
            console.log(move!.status_name[i],"が",move!.status_rank[i]);
        }
        console.log("変化した");
        break;

        case "net-good-stats":
            if(move!.status_target === "user"){
                for(let i = 0; i < move!.status_name.length; i++){
                    const statusName = move!.status_name[i];
                    const statusRank = move!.status_rank[i];
                    switch(statusName){
                        case "attack":
                            user[0].getRank().setAttackRank(user[0].getRank().getAttackRank() + statusRank);
                            break;
                        case "defense":
                            user[0].getRank().setDefenseRank(user[0].getRank().getDefenseRank() + statusRank);
                            break;
                        case "special_attack":   
                            user[0].getRank().setSpecialAttackRank(user[0].getRank().getSpecialAttackRank() + statusRank);
                            break;
                        case "special_defense":
                            user[0].getRank().setSpecialDefenseRank(user[0].getRank().getSpecialDefenseRank() + statusRank);
                            break;
                        case "speed":
                            user[0].getRank().setSpeedRank(user[0].getRank().getSpeedRank() + statusRank);
                            break;
                        case "accuracy":
                            user[0].getRank().setAccuracyRank(user[0].getRank().getAccuracyRank() + statusRank);
                            break;
                    }
                }
                console.log(user[0].getName(),"は",move!.name,"をつかった,");
                for(let i = 0; i < move!.status_name.length; i++){
                    console.log(move!.status_name[i],"が",move!.status_rank[i]);
                }
                console.log("変化した");
                break;           
            }
            else {
                for(let i = 0; i < move!.status_name.length; i++){  
                    const statusName = move!.status_name[i];
                    const statusRank = move!.status_rank[i];
                    switch(statusName){
                        case "attack":
                            opponent[0].getRank().setAttackRank(opponent[0].getRank().getAttackRank() - statusRank);
                            break;
                        case "defense":
                            opponent[0].getRank().setDefenseRank(opponent[0].getRank().getDefenseRank() - statusRank);
                            break;
                        case "special_attack":   
                            opponent[0].getRank().setSpecialAttackRank(opponent[0].getRank().getSpecialAttackRank() - statusRank);
                            break;
                        case "special_defense":
                            opponent[0].getRank().setSpecialDefenseRank(opponent[0].getRank().getSpecialDefenseRank() - statusRank);
                            break;
                        case "speed":
                            opponent[0].getRank().setSpeedRank(opponent[0].getRank().getSpeedRank() - statusRank);
                            break;
                        case "accuracy":
                            opponent[0].getRank().setAccuracyRank(opponent[0].getRank().getAccuracyRank() - statusRank);
                            break;
                    }
                }
                console.log(user[0].getName(),"は",move!.name,"をつかった,");
                console.log(opponent[0].getName(),"の");
                for(let i = 0; i < move!.status_name.length; i++){
                    console.log(move!.status_name[i],"が",move!.status_rank[i]);
                }
                console.log("変化した");
                break;               
            }
    }
}