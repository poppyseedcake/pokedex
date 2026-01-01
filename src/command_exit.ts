import { exit } from 'node:process';
import { State } from './state';

export async function commandExit(state: State) {
    console.log("Closing the Pokedex... Goodbye!");
    state.readline.close();
    exit(0);
}