import { Component, EventEmitter, Output } from '@angular/core';
import { BaseGameCardComponent } from '../base-game-card/base-game-card.component';
import { SteamApps } from '../../../interfaces/steamGamesList';


@Component({
  selector: 'app-home-game-card',
  imports: [],
  templateUrl: './home-game-card.component.html',
  styleUrl: './home-game-card.component.scss'
})

export class HomeGameCardComponent extends BaseGameCardComponent {
  @Output() wishlistSend = new EventEmitter<SteamApps>

  sendToWishlist(game: SteamApps){
    this.wishlistSend.emit(game)
  }
}
