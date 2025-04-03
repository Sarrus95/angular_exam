import { Component, EventEmitter, Output } from '@angular/core';
import { BaseGameCardComponent } from '../base-game-card/base-game-card.component';
import { SteamApps } from '../../../interfaces/steamGamesList';

@Component({
  selector: 'app-library-game-card',
  imports: [],
  templateUrl: './library-game-card.component.html',
  styleUrl: './library-game-card.component.scss'
})
export class LibraryGameCardComponent extends BaseGameCardComponent {
  @Output() favouriteAdd = new EventEmitter<SteamApps>;
  @Output() favouriteRemove = new EventEmitter<SteamApps>;

  addToFavourites(game: SteamApps){
    this.favouriteAdd.emit(game);
  }

  removeFromFavourites(game: SteamApps){
    this.favouriteRemove.emit(game);
  }
}
