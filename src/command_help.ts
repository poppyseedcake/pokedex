import type { CLICommand } from "./command";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    const commandsValues = Object.values(commands);    
    for (const value of commandsValues) {
        console.log(`${value.name}: ${value.description}`);
    }
}