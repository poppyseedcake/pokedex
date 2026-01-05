export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
  
    constructor() {}
  
    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
      if (pageURL === undefined) {
        throw new Error('No URL provided.');
      }

      try {
        const response = await fetch(pageURL);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error.message);
      }
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