import type { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }
  
  const pokemon_name = args[0];
  const pokemon = await state.pokeAPI.fetchPokemon(pokemon_name);
  
  console.log(`Throwing a Pokeball at ${pokemon_name}...`);
}