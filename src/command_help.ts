import { State } from "./state";

export async function commandHelp(state: State) {
    console.log();
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");
    console.log();

    for (const com in state.commands) {
        console.log(`${state.commands[com].name}: ${state.commands[com].description}`);
    }
}