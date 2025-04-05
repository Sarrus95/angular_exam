import { Component, EventEmitter, Output } from '@angular/core';
import { BaseGameCardComponent } from '../base-game-card/base-game-card.component';
import { SteamApps } from '../../../interfaces/steamGamesList';
import { LocalStorageService } from '../../../services/local-storage.service';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-home-game-card',
  imports: [],
  templateUrl: './home-game-card.component.html',
  styleUrl: './home-game-card.component.scss'
})

export class HomeGameCardComponent extends BaseGameCardComponent {
  @Output() wishlistSend = new EventEmitter<SteamApps>;
  @Output() librarySend = new EventEmitter<SteamApps>;

  constructor(localStorage: LocalStorageService){
    super(localStorage);
  }

  sendToWishlist(game: SteamApps){
    this.wishlistSend.emit(game);
  }

  sendToLibrary(game: SteamApps){
    this.librarySend.emit(game);
  }

  isInWishlist(game: SteamApps){
    return this.localStorage.isIn(environment.wishlistLabel,game);
  }

  isInLibrary(game: SteamApps){
    return this.localStorage.isIn(environment.libraryLabel,game);
  }

  isInFavourites(game: SteamApps){
    return this.localStorage.isIn(environment.favouritesLabel,game);
  }
}