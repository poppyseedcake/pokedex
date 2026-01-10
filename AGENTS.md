# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a TypeScript command-line interactive Pokedex application built with Node.js. It uses the PokeAPI for data and implements a REPL (Read-Eval-Print Loop) interface with a command system.

## Development Commands

### Build and Run
```bash
npm run build          # Compile TypeScript to JavaScript
npm start             # Run the compiled application
npm run dev           # Build and run in one command
```

### Testing
```bash
npm test              # Run all tests
npx vitest run src/repl.test.ts           # Run single test file
npx vitest run src/command_search.test.ts # Run specific command test
npx vitest --watch   # Run tests in watch mode
```

### Code Quality
```bash
npx eslint src/       # Lint source files (needs config)
npx prettier --write src/  # Format source files (needs config)
```

## Code Style Guidelines

### TypeScript Configuration
- **Target**: ES2022 with Node.js modules
- **Module System**: ES Modules (use `.js` extensions in imports)
- **Type Safety**: Strict mode enabled
- **Runtime**: Node.js v22.15.0 (specified in `.nvmrc`)

### Import Style
```typescript
// Type imports - use "import type"
import type { State } from "./state.js";
import type { Pokemon } from "./pokeapi.js";

// Value imports
import { PokeAPI } from "./pokeapi.js";
import { commandHelp } from "./command_help.js";
```

### File Naming
- **Commands**: kebab-case with `command_` prefix (e.g., `command_help.ts`)
- **Core files**: camelCase (e.g., `main.ts`, `pokeapi.ts`)
- **Test files**: same name as source with `.test.ts` suffix

### Naming Conventions
- **Functions/Variables**: camelCase (`commandMapForward`, `cleanInput`)
- **Types/Interfaces**: PascalCase (`CLICommand`, `State`)
- **Constants**: UPPER_SNAKE_CASE (`baseURL`, `DEFAULT_TTL`)
- **Private fields**: Use `#` prefix (`#cache`, `#ttl`)

### Code Organization

#### Command Structure
Each command should be an async function with this signature:
```typescript
export async function commandName(args: string[], state: State): Promise<void> {
  // Implementation
}
```

#### Class Design
- Use private fields with `#` prefix for internal state
- Implement proper error handling with try-catch blocks
- Use async/await consistently for API operations
- Provide clear error messages to users

#### Error Handling
```typescript
try {
  // Operation
} catch (error) {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
}
```

### Testing Guidelines

#### Test Structure
- Use `describe.each` for parameterized tests
- Use `test.concurrent.each` for independent test cases
- Proper async/await handling in tests
- Test real behavior (avoid excessive mocking)

#### Test Naming
- Use descriptive test names that explain the scenario
- Group related tests in `describe` blocks
- Test both success and error cases

### API Integration

#### PokeAPI Client
- Use the existing `PokeAPI` class for all API calls
- Respect rate limits through the built-in cache
- Handle pagination with `next`/`previous` URLs
- Use proper TypeScript types for API responses

#### Cache Usage
- Cache is automatically used by the PokeAPI client
- Default TTL is 5 minutes, configurable via environment
- Cache keys are automatically generated from URLs

### State Management

#### State Object
The `State` object contains:
- `pokemon`: Current Pokemon data
- `page`: Current page information
- `cache`: Cache instance
- `api`: PokeAPI client instance

#### State Updates
- Modify state directly in command functions
- State is passed by reference to all commands
- No need to return updated state

### Code Patterns

#### Command Registration
```typescript
import { commandMapForward } from "./command_map.js";

// In commands.ts
export const commands = {
  "help": commandHelp,
  "search": commandSearch,
  // Add new commands here
};
```

#### Input Processing
- Use `cleanInput()` to trim and normalize user input
- Commands are case-insensitive
- Arguments are split on whitespace

#### Output Formatting
- Use `console.log` for normal output
- Use `console.error` for errors
- Provide clear, user-friendly messages
- Use consistent formatting for lists and tables

## Architecture Guidelines

### Separation of Concerns
- **REPL Logic**: `repl.ts` - handles user input and command dispatch
- **Commands**: Individual files in `command_*.ts` - implement specific functionality
- **API Layer**: `pokeapi.ts` - handles external API communication
- **Cache Layer**: `pokecache.ts` - manages data caching
- **State**: `state.ts` - defines types and state management

### Adding New Commands
1. Create `command_name.ts` with async function
2. Export the function with proper signature
3. Add to commands registry in `commands.ts`
4. Write corresponding test file `command_name.test.ts`
5. Test with `npx vitest run src/command_name.test.ts`

### Performance Considerations
- Cache all API responses to minimize external calls
- Use pagination for large result sets
- Implement proper error handling to avoid crashes
- Consider memory usage for large datasets

## Environment Variables

- `CACHE_TTL`: Cache time-to-live in seconds (default: 300)
- `POKEAPI_BASE_URL`: Base URL for PokeAPI (default: https://pokeapi.co/api/v2)

## Common Issues and Solutions

### TypeScript Module Resolution
- Always use `.js` extensions in imports (ES modules requirement)
- Use `import type` for type-only imports
- Ensure `moduleResolution: "node"` in tsconfig.json

### Async/Await Usage
- All API calls should use async/await
- Command functions must be async
- Handle promise rejections in try-catch blocks

### Testing Time-sensitive Code
- Use `vi.useFakeTimers()` for cache-related tests
- Clean up timers with `vi.useRealTimers()`
- Test concurrent operations properly

This file should be kept up-to-date as the project evolves. Agents should read this file before making changes to understand the project's conventions and patterns.