import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogService } from 'src/app/services/pokemon-catalog.service';

@Component({
  selector: 'app-guitar-catalogue',
  templateUrl: './guitar-catalogue.page.html',
  styleUrls: ['./guitar-catalogue.page.css']
})
export class GuitarCataloguePage implements OnInit {

  get pokemons(): Pokemon[] {
    return this.pokemonCatalogService.pokemons;
  }

  get loading(): boolean {
    return this.pokemonCatalogService.loading;
  }

  get error(): string {
    return this.pokemonCatalogService.error;
  }

  constructor(
    private readonly pokemonCatalogService: PokemonCatalogService
  ) { }

  ngOnInit(): void {
    this.pokemonCatalogService.findAllPokemons();
  }

}
