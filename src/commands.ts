import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMapBack, commandMapForward } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
      help: {
        name: "help",
        description: "Displays a help message",
        callback: commandHelp,
      },
      map: {
        name: "map",
        description: "Displays 20 next locations",
        callback: commandMapForward,
      },
      mapb: {
        name: "mapb",
        description: "Displays 20 previous locations",
        callback: commandMapBack,
      },
      explore: {
        name: "explore <location_name>",
        description: "Explore a location",
        callback: commandExplore, 
      },
    };
}