export interface PokemonResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Pokemon[];
    length: number;
}

export interface Pokemon {
    name:string;
    url:string;
    id:number;
}
