import { Component, KeyValueDiffers } from '@angular/core';
import { ModalHandler } from '../../classes/modalHandler';
import { LocalStorageService } from '../../services/local-storage.service';
import { SteamApps } from '../../interfaces/steamGamesList';
import { LibraryGameCardComponent } from "../../components/cards/library-game-card/library-game-card.component";
import { InfoGameCardComponent } from "../../components/modals/info-game-card/info-game-card.component";
import { environment } from '../../../environments/environment';
import { CategoryService } from '../../services/categories-service.service';
import { SearchGameService } from '../../services/search-game.service';

@Component({
  selector: 'app-library',
  imports: [LibraryGameCardComponent, InfoGameCardComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent extends ModalHandler{
  libraryGames!: SteamApps[];
  favouriteGames!: SteamApps[];

  constructor(private localStorage: LocalStorageService,private categoryService: CategoryService, private searchGameService: SearchGameService) {
    super();
  }

  ngOnInit(){
    this.loadLibrary();
    this.loadFavourites();
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

  loadLibrary(){
    this.libraryGames = JSON.parse(this.localStorage.getItem(environment.libraryLabel) || '[]')
  }

  loadFavourites(){
    this.favouriteGames = JSON.parse(this.localStorage.getItem(environment.favouritesLabel) || '[]')
  }

  favouriteAddHandler(game: SteamApps){
    const favourites = JSON.parse(this.localStorage.getItem(environment.favouritesLabel) || '[]')
    if(!favourites.some((favouriteGames: SteamApps) => favouriteGames.appid === game.appid)){
      favourites.push(game);
      this.localStorage.setItem(environment.favouritesLabel,JSON.stringify(favourites))
      alert("Game Added To Favourites!")
    }
    else{
      alert("Game Already In Favourites!")
    }
  }

  favouriteRemoveHandler(game: SteamApps){
    const favourites = this.favouriteGames.filter((favouriteGames: SteamApps) => 
      favouriteGames.appid !== game.appid)
    this.localStorage.setItem(environment.favouritesLabel,JSON.stringify(favourites))
    alert("Game Removed From Favourites!")
    this.loadFavourites();
  }

  applyCategoryFilter(category: string) {
    if (category === 'Tutti') {
      this.libraryGames = JSON.parse(
        this.localStorage.getItem(environment.libraryLabel) || '[]'
      );
    } else {
      this.libraryGames = this.libraryGames.filter((game) =>
        game.data?.genres.some((genre) => genre.description === category)
      );
    }
  }

  applySearchFilter(searchQuery: string) {
    const allLibraryGames: SteamApps[] = JSON.parse(
      this.localStorage.getItem(environment.libraryLabel) || '[]'
    );
  
    if (!searchQuery || searchQuery.trim() === '') {
      this.libraryGames = allLibraryGames;
    } else {
      this.libraryGames = allLibraryGames.filter((game) =>
        game.data?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }
}
