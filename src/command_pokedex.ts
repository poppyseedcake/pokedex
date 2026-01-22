
import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  if (!state.caughtPokemon) {
    throw new Error("you have not caught any pokemon");
  }

  console.log("Your Pokedex:");
  for (const pokemon in state.caughtPokemon) {
    console.log(` - ${pokemon}`);
  }
}
