import { Component } from '@angular/core';
import { SteamApps, SteamGamesList } from '../../interfaces/steamGamesList';
import { SteamAPIService } from '../../services/steam-api.service';
import { AppData } from '../../interfaces/steamGamesData';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { forkJoin } from 'rxjs';
import { InfoGameCardComponent } from '../../components/cards/info-game-card/info-game-card.component';
import { HomeGameCardComponent } from '../../components/cards/home-game-card/home-game-card.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ModalHandler } from '../../classes/modalHandler';

@Component({
  selector: 'app-home',
  imports: [SpinnerComponent, InfoGameCardComponent,HomeGameCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent extends ModalHandler {
  homeGames: SteamApps[];
  lastAppId: number;

  constructor(private steamService: SteamAPIService,private localStorage: LocalStorageService) {
    super();
    this.homeGames = [];
    this.lastAppId = 0;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.homeGames = [];
    this.steamService
      .getGamesInfo(this.lastAppId)
      .subscribe((data: SteamGamesList) => {
        this.homeGames.push(...data.response.apps);
        this.lastAppId = data.response.last_appid;
        this.loadInfo();
      });
  }

  loadInfo() {
    const requests = this.homeGames.map((game) =>
      this.steamService.getGamesData(game.appid)
    );
    forkJoin(requests).subscribe((responses) => {
      responses.forEach((info, index) => {
        const id = this.homeGames[index].appid.toString();
        const appData: AppData = {
          name: info[id]?.data.name,
          short_description: info[id]?.data.short_description || '',
          header_image: info[id]?.data.header_image || '',
          price_overview: {
            final_formatted:
              info[id]?.data.price_overview?.final_formatted || 'Free To Play',
          },
          metacritic: {
            score: info[id]?.data.metacritic?.score || 0,
          },
          genres: [...(info[id]?.data.genres || [])],
          release_date: info[id]?.data.release_date || '',
          support_info: {
            url:
              info[id]?.data.support_info?.url ||
              'https://store.steampowered.com/',
          },
        };
        this.homeGames[index].data = appData;
      });
    });
  }

  wishlistHandler(game: SteamApps){
    const wishlist = JSON.parse(this.localStorage.getItem('wishlist') || '[]');
    if (!wishlist.some((wishlistGame: SteamApps) => wishlistGame.appid === game.appid)){
      wishlist.push(game);
      this.localStorage.setItem('wishlist',JSON.stringify(wishlist));
      alert("Game Added To Wishlist!");
    }
    else{
      alert("Game Already In Wishlist!");
    }
  }
}
