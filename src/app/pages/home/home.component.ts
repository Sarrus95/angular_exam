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
import { SearchGameService } from '../../services/search-game.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [SpinnerComponent, InfoGameCardComponent, HomeGameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ModalHandler {
  homeGames: SteamApps[];
  page: number;
  gamesLoaded: boolean;
  actions = {
    firstPage: environment.firstPage,
    nextPage: environment.nextPage,
    prevPage: environment.prevPage,
  };

  constructor(
    private viewportScroller: ViewportScroller,
    private steamGameFetch: SteamGameFetchService,
    private localStorage: LocalStorageService,
    private categoryService: CategoryService,
    private searchGameService: SearchGameService
  ) {
    super();
    this.homeGames = [];
    this.page = 0;
    this.gamesLoaded = false;
  }

  ngOnInit() {
    this.fetchHomeGames();
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
  

  fetchHomeGames(action?: string) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.hideGames();
    if (action === this.actions.nextPage) {
      this.page++;
      
    } else if (action === this.actions.prevPage) {
      this.page--;
    } else if (action === this.actions.firstPage) {
      this.page = 0;
    }
    this.steamGameFetch.fetchInitGameData(this.page);
    this.steamGameFetch.storedGamesSubject.subscribe((fetchedGames) => {
      this.homeGames = fetchedGames;
      this.showGames();
    })
  }

  loadHomeGames() {
    this.homeGames = JSON.parse(
      this.localStorage.getItem(environment.storedGamesLabel) || '[]'
    );
    this.showGames();
  }

  showGames() {
    setTimeout(() => this.gamesLoaded = true,800);
  }

  hideGames() {
    this.gamesLoaded = false;
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

  libraryHandler(game: SteamApps) {
    const library = JSON.parse(this.localStorage.getItem('library') || '[]');
    if (
      !library.some(
        (libraryGames: SteamApps) => libraryGames.appid === game.appid
      )
    ) {
      library.push(game);
      this.localStorage.setItem('library', JSON.stringify(library));
      alert('Game Added To Library!');
    } else {
      alert('Game Already In Library!');
    }
  }

  applyCategoryFilter(category: string) {
    if (category === 'Tutti') {
      this.homeGames = JSON.parse(
        this.localStorage.getItem(environment.storedGamesLabel) || '[]'
      );
    } else {
      this.homeGames = this.homeGames.filter((game) =>
        game.data?.genres.some((genre) => genre.description === category)
      );
    }
  }

  applySearchFilter(searchQuery: string) {
    const allGames: SteamApps[] = JSON.parse(
      this.localStorage.getItem(environment.storedGamesLabel) || '[]'
    );
  
    if (!searchQuery || searchQuery.trim() === '') {
      this.homeGames = allGames;
    } else {
      this.homeGames = allGames.filter((game) =>
        game.data?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
}