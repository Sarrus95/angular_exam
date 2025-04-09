import { Component } from '@angular/core';
import { SteamApps } from '../../interfaces/steamGamesList';
import { WishlistGameCardComponent } from "../../components/cards/wishlist-game-card/wishlist-game-card.component";
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalHandler } from '../../classes/modalHandler';
import { InfoGameCardComponent } from "../../components/modals/info-game-card/info-game-card.component";
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../services/categories-service.service';
import { SearchGameService } from '../../services/search-game.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  imports: [WishlistGameCardComponent, InfoGameCardComponent]
})
export class WishlistComponent extends ModalHandler {
  wishlistGames!: SteamApps[];

  constructor(private localStorage : LocalStorageService,private categoryService: CategoryService, private searchGameService: SearchGameService) {  
    super();
  }

  ngOnInit(){
    this.loadWishlist();
    this.categoryService.selectedCategory.subscribe((category) => {
      if (category) {
        this.applyCategoryFilter(category);
      }
    });
  
    this.searchGameService.searchedGame.subscribe((searchQuery) => {
      if (searchQuery !== null) {
        this.applySearchFilter(searchQuery);
      }
    });
  }

  loadWishlist(){
    this.wishlistGames = JSON.parse(this.localStorage.getItem(environment.wishlistLabel) || '[]')
  }

  buyGameHandler(game: SteamApps){
    const library = JSON.parse(this.localStorage.getItem(environment.libraryLabel) || '[]');
    if(!library.some((libraryGames: SteamApps) => libraryGames.appid === game.appid)){
      library.push(game);
      this.localStorage.setItem(environment.libraryLabel,JSON.stringify(library));
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
    this.localStorage.setItem(environment.wishlistLabel,JSON.stringify(wishlist));
    alert("Game Removed From Wishlist!");
    this.loadWishlist();
  }

    applyCategoryFilter(category: string) {
      if (category === 'Tutti') {
        this.wishlistGames = JSON.parse(
          this.localStorage.getItem(environment.wishlistLabel) || '[]'
        );
      } else {
        this.wishlistGames = this.wishlistGames.filter((game) =>
          game.data?.genres.some((genre) => genre.description === category)
        );
      }
    }
  
    applySearchFilter(searchQuery: string) {
      const allWishlistGames: SteamApps[] = JSON.parse(
        this.localStorage.getItem(environment.wishlistLabel) || '[]'
      );
    
      if (!searchQuery || searchQuery.trim() === '') {
        this.wishlistGames = allWishlistGames;
      } else {
        this.wishlistGames = allWishlistGames.filter((game) =>
          game.data?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }
}
