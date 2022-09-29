import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogService } from './pokemon-catalog.service';
import { UserService } from './user.service';

const { apiKey, apiUsers} = environment;

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogService,
    private readonly userService: UserService
  ) { }


  public addToFavourites(pokemonId: number): Observable<User> {
    if(!this.userService.user) {
      throw new Error("There is no user")
    }
    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined = this.pokemonService.findPokemonById(pokemonId)

    if(!pokemon) {
      throw new Error("no pokemon whit id: " + pokemonId)
    }

    if (this.userService.inFavorites(pokemonId)) {
      this.userService.removeFromFavourites(pokemonId);
    } else {
      this.userService.addToFavourites(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey  
    })


    return this.http.patch<User>(`${apiUsers}/${user.id}`, {
      favourites: [...user.favourites]
    }, {
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser;
      })
    ) 
  }


}
