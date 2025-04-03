import { Component, KeyValueDiffers } from '@angular/core';
import { ModalHandler } from '../../classes/modalHandler';
import { LocalStorageService } from '../../services/local-storage.service';
import { SteamApps } from '../../interfaces/steamGamesList';
import { LibraryGameCardComponent } from "../../components/cards/library-game-card/library-game-card.component";
import { InfoGameCardComponent } from "../../components/cards/info-game-card/info-game-card.component";

@Component({
  selector: 'app-library',
  imports: [LibraryGameCardComponent, InfoGameCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent extends ModalHandler{
  libraryGames!: SteamApps[];
  favouriteGames!: SteamApps[];

  constructor(private localStorage: LocalStorageService){
    super();
  }

  ngOnInit(){
    if(!this.libraryGames)
      this.loadLibrary();
    if(!this.favouriteGames)
      this.loadFavourites();
  }

  loadLibrary(){
    this.libraryGames = JSON.parse(this.localStorage.getItem('library') || '[]')
  }

  loadFavourites(){
    this.favouriteGames = JSON.parse(this.localStorage.getItem('favourites') || '[]')
  }

  favouriteAddHandler(game: SteamApps){
    const favourites = JSON.parse(this.localStorage.getItem('favourites') || '[]')
    if(!favourites.some((favouriteGames: SteamApps) => favouriteGames.appid === game.appid)){
      favourites.push(game);
      this.localStorage.setItem('favourites',JSON.stringify(favourites))
      alert("Game Added To Favourites!")
    }
    else{
      alert("Game Already In Favourites!")
    }
  }

  favouriteRemoveHandler(game: SteamApps){
    const favourites = this.favouriteGames.filter((favouriteGames: SteamApps) => 
      favouriteGames.appid !== game.appid)
    this.localStorage.setItem('favourites',JSON.stringify(favourites))
    alert("Game Removed From Favourites!")
    this.loadFavourites();
  }
}
