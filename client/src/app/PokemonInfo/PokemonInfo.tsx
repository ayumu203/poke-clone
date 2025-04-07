import Image from 'next/image'

type Info = {
  front_image:string,
  name:string,
  type:string,
  level:number,
  move1_name:string,
  move2_name:string,
  move1_description:string,
  move2_description:string,
  move1_type:string,
  move2_type:string,
}

export default function PokemonInfo(info:Info) {
  
  function typeToColor(type:string):string{
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
  
  return (
    <div className='flex justify-center'>
      <div
        style={{
          borderColor:typeToColor(info.type)
        }}
        className='w-[90%] mt-10 flex justify-evenly items-center text-gray-800 border-y-2 '>
          <Image src={info.front_image} alt={info.name} width={100} height={100}></Image>
          <div>
              <p>レベル{info.level}</p>
              <p style={{
                color:typeToColor(info.type)
              }}>{info.name}</p>
          </div>
          <div>
            <div className='flex'>
                <p style={{color:typeToColor(info.move1_type)}}>{(info.move1_name)}</p>
                <p>:{(info.move1_description)}</p>
            </div>
            <div className='flex'>
              <p style={{color:typeToColor(info.move2_type)}}>{(info.move2_name)}</p>
              <p>:{(info.move2_description)}</p>
            </div>
          </div>
      </div>
    </div>
  )
}
