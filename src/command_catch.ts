import type { State } from "./state.js"

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }
  
  const pokemon_name = args[0];
  const pokemon = await state.pokeAPI.fetchPokemon(pokemon_name);
  const chance: number = (300 - pokemon.base_experience) / 300;
  const isCatched = Math.random() < chance ? 1 : 0;

  console.log(`Throwing a Pokeball at ${pokemon.name}...`);

  if (isCatched) {
    console.log(`${pokemon.name} catched!`);
    state.pokemon[pokemon.name] = pokemon;

  } else {
    console.log(`Try again!`);

  }
}