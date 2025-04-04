import { Component } from '@angular/core';
import { SteamApps } from '../../interfaces/steamGamesList';
import { WishlistGameCardComponent } from "../../components/cards/wishlist-game-card/wishlist-game-card.component";
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalHandler } from '../../classes/modalHandler';
import { InfoGameCardComponent } from "../../components/modals/info-game-card/info-game-card.component";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  imports: [WishlistGameCardComponent, InfoGameCardComponent]
})
export class WishlistComponent extends ModalHandler {
  wishlistGames!: SteamApps[];

  constructor(private localStorage : LocalStorageService){
    super();
  }

  ngOnInit(){
    if(!this.wishlistGames)
      this.loadWishlist();
  }

  loadWishlist(){
    this.wishlistGames = JSON.parse(this.localStorage.getItem('wishlist') || '[]')
  }

  buyGameHandler(game: SteamApps){
    const library = JSON.parse(this.localStorage.getItem('library') || '[]');
    if(!library.some((libraryGames: SteamApps) => libraryGames.appid === game.appid)){
      library.push(game);
      this.localStorage.setItem('library',JSON.stringify(library));
      alert("Game Added To Library!");
      this.wishlistRemoverHandler(game);
    }
    else{
      alert("Game Already In Library!")
    }
  }

  wishlistRemoverHandler(game: SteamApps){
    const wishlist = this.wishlistGames.filter((wishlistGame: SteamApps) => 
      wishlistGame.appid != game.appid);
    this.localStorage.setItem('wishlist',JSON.stringify(wishlist));
    alert("Game Removed From Wishlist!");
    this.loadWishlist();
  }
}
