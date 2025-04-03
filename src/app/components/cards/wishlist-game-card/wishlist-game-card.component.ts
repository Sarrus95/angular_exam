import { Component, EventEmitter, Output } from '@angular/core';
import { BaseGameCardComponent } from '../base-game-card/base-game-card.component';
import { SteamApps } from '../../../interfaces/steamGamesList';

@Component({
  selector: 'app-wishlist-game-card',
  imports: [],
  templateUrl: './wishlist-game-card.component.html',
  styleUrl: './wishlist-game-card.component.scss'
})
export class WishlistGameCardComponent extends BaseGameCardComponent {
  @Output() gameBought = new EventEmitter<SteamApps>;
  @Output() wishlistRemover = new EventEmitter<SteamApps>;

  buyGame(game: SteamApps){
    this.gameBought.emit(game);
  }

  removeFromWishlist(game: SteamApps){
    this.wishlistRemover.emit(game);
  }
}
