import { Component } from '@angular/core';
import { SteamApps } from '../../interfaces/steamGamesList';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistGames: SteamApps[]

  constructor(){
    this.wishlistGames = [];
  }
}
