import { Component } from '@angular/core';
import { SteamAPIService } from './services/steam-api.service';
import { SteamGamesList, SteamApps } from './interfaces/steamGamesList';
import { AppData, SteamGamesData } from './interfaces/steamGamesData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  games: SteamApps[];
  gamesInfo: SteamGamesData[];
  lastAppId: number;

  constructor(private steamService: SteamAPIService) {
    this.games = [];
    this.gamesInfo = [];
    this.lastAppId = 0;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.games = [];
    this.gamesInfo = [];
    this.steamService
      .getGamesInfo(this.lastAppId)
      .subscribe((data: SteamGamesList) => {
        this.games.push(...data.response.apps);
        this.lastAppId = data.response.last_appid;
        this.loadInfo();
      });
  }

  loadInfo() {
    this.games.forEach((game) => {
      this.steamService.getGamesData(game.appid).subscribe((info) => {
        const id = game.appid.toString();
        const appData: AppData = {
          short_description: info[id].data.short_description,
              header_image: info[id].data.header_image,
              price_overview: {
                  final_formatted: info[id].data.price_overview?.final_formatted || "Free To Play"
              },
              metacritic: {
                  score: info[id].data.metacritic?.score || 0
              },
              genres: [...info[id].data.genres],
              release_date: info[id].data.release_date,
              support_info: {
                  url: info[id].data.support_info.url 
                  ? info[id].data.support_info.url
                  : "https://store.steampowered.com/"
              }
        }
        this.gamesInfo.push({
          app_id: id,
          data: appData
        })
      });
    });
  }
}
