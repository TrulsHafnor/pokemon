import { Component, OnInit } from '@angular/core';
import { PokemonCatalogService } from './services/pokemon-catalog.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly userService : UserService,
    private readonly pokemonService: PokemonCatalogService
  ) {}

  ngOnInit(): void {
    if(this.userService.user) {
      this.pokemonService.findAllPokemons();
    }
  }
}
