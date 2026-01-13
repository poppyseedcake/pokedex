import { State } from "./state.js";

export async function commandExplore(state: State, location: string) {
    const response = await state.pokeAPI.fetchLocation(location);
    console.log("explore");
    console.log(response);
    console.log("explore");

}