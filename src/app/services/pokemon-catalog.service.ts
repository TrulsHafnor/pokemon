import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon, PokemonResponse } from '../models/pokemon.model';
import { finalize, Observable, of } from 'rxjs'

const { apiPokemons} = environment;

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading
  }

  constructor(private readonly http: HttpClient) { }


  public findAllPokemons(): void {

    if(this._pokemons.length>0 || this.loading) {
      return;
    }

    this._loading = true;
    this.http.get<PokemonResponse>(apiPokemons)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    .subscribe({
      next: (pokemon: PokemonResponse) => {
        this._pokemons = [];

        for (const newPokemon of pokemon.results) {

          const pokemonId: number = Number(newPokemon.url.split("/")[6]) || 0;

          this._pokemons.push({
            name: newPokemon.name,
            url: newPokemon.url,
            id: pokemonId
          })
        }
        //this._pokemons = pokemons;
      },
      error: (error: HttpErrorResponse) => {
        this._error = error.message;
      }
    })
  }

  public findPokemonById(id: number): Pokemon | undefined {
    return this._pokemons.find((pokemon: Pokemon) => pokemon.id ===id);
  }

}
