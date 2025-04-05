import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SteamApps } from '../../interfaces/steamGamesList';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { InfoGameCardComponent } from '../../components/modals/info-game-card/info-game-card.component';
import { HomeGameCardComponent } from '../../components/cards/home-game-card/home-game-card.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalHandler } from '../../classes/modalHandler';
import { SteamGameFetchService } from '../../services/steam-game-fetch.service';
import { CategoryService } from '../../services/categories-service.service';



@Component({
  selector: 'app-home',
  imports: [SpinnerComponent, InfoGameCardComponent, HomeGameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ModalHandler {
  homeGames: SteamApps[];
  categoryGames: SteamApps[];
  page: number;
  actions = {
    nextPage: environment.nextPage,
    prevPage: environment.prevPage
  }

  constructor(
    private steamGameFetch: SteamGameFetchService,
    private localStorage: LocalStorageService,
    private categoryService: CategoryService
  ) {
    super();
    this.homeGames = [];
    this.categoryGames = [];
    this.page = 0;
  }

  ngOnInit() {
    this.loadHomeGames();
    this.categoryService.selectedCategory.subscribe((category) => {
      if (category) {
        this.categoryFetch(category);
      }
    });
  }

  loadHomeGames(action?: string) {
    this.categoryCleaner();
    if(action === this.actions.nextPage){
      this.page++;
    }
    else if(action === this.actions.prevPage){
      this.page--;
    }
    this.steamGameFetch.fetchInitGameData(this.page);
    this.steamGameFetch.storedGamesSubject.subscribe((games) => {
      this.homeGames = games;
    });
  }

  wishlistHandler(game: SteamApps) {
    const wishlist = JSON.parse(this.localStorage.getItem('wishlist') || '[]');
    if (
      !wishlist.some(
        (wishlistGame: SteamApps) => wishlistGame.appid === game.appid
      )
    ) {
      wishlist.push(game);
      this.localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Game Added To Wishlist!');
    } else {
      alert('Game Already In Wishlist!');
    }
  }

  libraryHandler(game: SteamApps){
    const library = JSON.parse(this.localStorage.getItem('library') || '[]');
    if(!library.some((libraryGames: SteamApps) => libraryGames.appid === game.appid)){
      library.push(game);
      this.localStorage.setItem('library',JSON.stringify(library));
      alert("Game Added To Library!");
    }
    else{
      alert("Game Already In Library!")
    }
  }

  categoryFetch(category: string) {
    if(category !== "Tutti"){
      const results = this.homeGames.filter((homeGame: SteamApps) =>
        homeGame.data?.genres.some((genre) => genre.description === category)
      );
      if (results.length > 0){
        this.categoryGames = results
      }
      else{
        alert(`No Games in category ${category}`)
      }
    }
    else{
      this.categoryCleaner();
    }
  }

  categoryCleaner(){
    this.categoryService.clearCategory();
    this.categoryGames = [];
  }
}