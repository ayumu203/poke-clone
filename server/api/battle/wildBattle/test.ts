import { fetchInitializedGameData } from "./fetchInitializedData"

const test = async() => {
    const data = await fetchInitializedGameData("8d64b01c-4949-4cfd-a3ee-e5dd0d85d63e");
    console.log(data);
}

test()