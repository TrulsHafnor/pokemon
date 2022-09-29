import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FavouriteService } from 'src/app/services/favourite.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.css']
})
export class FavouriteButtonComponent implements OnInit {

  public loading: boolean = false
  public isFavourite: boolean = false;
  @Input()pokemonId!: number;



  constructor(
    private userService: UserService,
    private readonly favouriteService: FavouriteService
  ) { }

  ngOnInit(): void {
    this.isFavourite = this.userService.inFavorites(this.pokemonId);
  }

  onFavouriteClick(): void {
    this.loading = true
    this.favouriteService.addToFavourites(this.pokemonId)
    .subscribe({
      next: (response: User) => {
        this.loading = false
        this.isFavourite = this.userService.inFavorites(this.pokemonId);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message)
      }
    })
  }

}
