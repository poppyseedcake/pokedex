import { createInterface } from 'node:readline';
import { getCommands } from './command.js';

export function startREPL(): void {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    rl.prompt();
    rl.on("line", async (line) => {
        const userInput = cleanInput(line);
        if (userInput.length === 0) {
            rl.prompt();
            return;
        }
        const command: string = userInput[0];
        const all_commands = getCommands();
        if (command in all_commands) {
            all_commands[command].callback(all_commands);
        } else {
            console.log("Unknown command");
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .toLowerCase()
        .trim()
        .split(" ")
        .filter((word) => word !== "");
}