export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      // implement this
    }
  
    async fetchLocation(locationName: string): Promise<Location> {
      // implement this
    }
  }
  
  export type ShallowLocations = {
    next: string | null,
    previous: string | null,
    reults: Location[],
  };
  
  export type Location = {
    name: string,
    url: string,
  };