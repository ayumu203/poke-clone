import { BattlePokemon } from "../../../class/BattlePokemon.class";
import { Move } from "../../../types/move.type";


export const handleStatusRank = (user:BattlePokemon[],opponent:BattlePokemon[],move:Move) => {
    let messages:string[] = [];
    let text:string = user[0].getName() + "は" + move?.name + "をつかった";
    messages.push(text);
    switch(move!.move_category){
        case "damage+raise":
            for(let i = 0; i < move!.status_name.length; i++){
                const statusName = move!.status_name[i];
            const statusRank = move!.status_rank[i];
            switch(statusName){
                case "attack":
                    user[0].getRank().setAttackRank(user[0].getRank().getAttackRank() + statusRank);
                    text = user[0].getName() + "の攻撃が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "defence":
                    user[0].getRank().setdefenceRank(user[0].getRank().getdefenceRank() + statusRank);
                    text = user[0].getName() + "の防御が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "special_attack":   
                    user[0].getRank().setSpecialAttackRank(user[0].getRank().getSpecialAttackRank() + statusRank);
                    text = user[0].getName() + "の特攻が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "special_defence":
                        user[0].getRank().setSpecialdefenceRank(user[0].getRank().getSpecialdefenceRank() + statusRank);
                    text = user[0].getName() + "の特防が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "speed":
                    user[0].getRank().setSpeedRank(user[0].getRank().getSpeedRank() + statusRank);
                    text = user[0].getName() + "の素早さが" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "accuracy":
                    user[0].getRank().setAccuracyRank(user[0].getRank().getAccuracyRank() + statusRank);
                    text = user[0].getName() + "の命中率が" + statusRank + "変化した";
                    messages.push(text);
                    break;
            }
        }
        break;
        case "damage+lower":
            for(let i = 0; i < move!.status_name.length; i++){  
                const statusName = move!.status_name[i];
                const statusRank = move!.status_rank[i];
                switch(statusName){
                case "attack":
                    opponent[0].getRank().setAttackRank(opponent[0].getRank().getAttackRank() - statusRank);
                    text = opponent[0].getName() + "の攻撃が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "defence":
                    opponent[0].getRank().setdefenceRank(opponent[0].getRank().getdefenceRank() - statusRank);
                    text = opponent[0].getName() + "の防御が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "special_attack":   
                    opponent[0].getRank().setSpecialAttackRank(opponent[0].getRank().getSpecialAttackRank() - statusRank);
                    text = opponent[0].getName() + "の特攻が" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "special_defence":
                        opponent[0].getRank().setSpecialdefenceRank(opponent[0].getRank().getSpecialdefenceRank() - statusRank);
                        text = opponent[0].getName() + "の特防が" + statusRank + "変化した";
                        messages.push(text);
                        break;
                case "speed":
                    opponent[0].getRank().setSpeedRank(opponent[0].getRank().getSpeedRank() - statusRank);
                    text = opponent[0].getName() + "の素早さが" + statusRank + "変化した";
                    messages.push(text);
                    break;
                case "accuracy":
                    opponent[0].getRank().setAccuracyRank(opponent[0].getRank().getAccuracyRank() - statusRank);
                    text = opponent[0].getName() + "の命中率が" + statusRank + "変化した";
                    messages.push(text);
                    break;
            }
        }
        break;

        case "net-good-stats":
            if(move!.status_target === "user"){
                for(let i = 0; i < move!.status_name.length; i++){
                    const statusName = move!.status_name[i];
                    const statusRank = move!.status_rank[i];
                    switch(statusName){
                        case "attack":
                            user[0].getRank().setAttackRank(user[0].getRank().getAttackRank() + statusRank);
                            text = user[0].getName() + "の攻撃が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "defence":
                            user[0].getRank().setdefenceRank(user[0].getRank().getdefenceRank() + statusRank);
                            text = user[0].getName() + "の防御が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "special_attack":   
                            user[0].getRank().setSpecialAttackRank(user[0].getRank().getSpecialAttackRank() + statusRank);
                            text = user[0].getName() + "の特攻が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "special_defence":
                            user[0].getRank().setSpecialdefenceRank(user[0].getRank().getSpecialdefenceRank() + statusRank);
                            text = user[0].getName() + "の特防が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "speed":
                            user[0].getRank().setSpeedRank(user[0].getRank().getSpeedRank() + statusRank);
                            text = user[0].getName() + "の素早さが" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "accuracy":
                            user[0].getRank().setAccuracyRank(user[0].getRank().getAccuracyRank() + statusRank);
                            text = user[0].getName() + "の命中率が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                    }
                }
                break;
            }
            else {
                for(let i = 0; i < move!.status_name.length; i++){  
                    const statusName = move!.status_name[i];
                    const statusRank = move!.status_rank[i];
                    switch(statusName){
                        case "attack":
                            opponent[0].getRank().setAttackRank(opponent[0].getRank().getAttackRank() - statusRank);
                            text = opponent[0].getName() + "の攻撃が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "defence":
                            opponent[0].getRank().setdefenceRank(opponent[0].getRank().getdefenceRank() - statusRank);
                            text = opponent[0].getName() + "の防御が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "special_attack":   
                            opponent[0].getRank().setSpecialAttackRank(opponent[0].getRank().getSpecialAttackRank() - statusRank);
                            text = opponent[0].getName() + "の特攻が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "special_defence":
                            opponent[0].getRank().setSpecialdefenceRank(opponent[0].getRank().getSpecialdefenceRank() - statusRank);
                            text = opponent[0].getName() + "の特防が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "speed":
                            opponent[0].getRank().setSpeedRank(opponent[0].getRank().getSpeedRank() - statusRank);
                            text = opponent[0].getName() + "の素早さが" + statusRank + "変化した";
                            messages.push(text);
                            break;
                        case "accuracy":
                            opponent[0].getRank().setAccuracyRank(opponent[0].getRank().getAccuracyRank() - statusRank);
                            text = opponent[0].getName() + "の命中率が" + statusRank + "変化した";
                            messages.push(text);
                            break;
                    }
                }
                break;
            }
    }
    // console.log(messages);
    return messages;
}