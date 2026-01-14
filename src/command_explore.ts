import { State } from "./state.js";

export async function commandExplore(state: State, location: string) {
    const response = await state.pokeAPI.fetchLocation(location);
    const pokemonNames: string[] = response.pokemon_encounters.map(e => e.pokemon.name);
    if (pokemonNames.length === 0) {
        console.log("No pokemons in this location");
        return
    }
    console.log("Found Pokemon:");
    pokemonNames.forEach(pokemon => {
        console.log(` - ${pokemon}`);
    });
}