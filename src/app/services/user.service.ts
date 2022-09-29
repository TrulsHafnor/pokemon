import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage.keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user;
  }

  constructor() {
    this._user =  StorageUtil.storageRead<User>(StorageKeys.User);
   }

   public inFavorites(pokemonId: number): boolean {
    if(this._user) {
      return Boolean(this.user?.favourites.find((pokemon: Pokemon) => pokemon.id === pokemonId))
    }
    return false
   }

   public addToFavourites(pokemon: Pokemon): void {
    if(this._user) {
      this._user.favourites.push(pokemon);
    }
   }

   public removeFromFavourites(pokemonId: number): void {
      if(this._user) {
        this._user.favourites = this._user.favourites.filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
      }
   }
}
