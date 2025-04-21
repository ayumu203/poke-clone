export function typeToColor(type:string):string{
    switch(type){
      case "normal":
        return "gray"
      case "fire":
        return "red";
      case "water":
        return "blue";
      case "grass":
        return "green";
      case "electric":
        return "yellow";
      case "ice":
        return "skyblue";
      case "fighting":
        return "orange";
      case "poison":
        return "ground";
      case "flyinc":
        return "cyan";
      case "phychic":
        return "ping";
      case "bug":
        return "yellowgreen"
      case "rock":
        return "brown";
      case "ghost":
        return "purple";
      case "dragon":
        return "cabalt";
      case "dark":
        return "black"
      case "steel":
        return "silver"
    }
    return ""
}
