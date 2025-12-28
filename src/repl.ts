import { createInterface } from 'node:readline';

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
        console.log(`Your command was: ${userInput[0]}`);
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