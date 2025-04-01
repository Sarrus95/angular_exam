import { Component } from '@angular/core';
import { SteamAPIService } from './services/steam-api.service';
import { SteamGamesList, SteamApps } from './interfaces/steamGamesList';
import { SteamGamesData } from './interfaces/steamGamesData';

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
    console.log(this.gamesInfo);
  }

  loadData() {
    this.games = [];
    this.gamesInfo = [];
    this.steamService
      .getGamesData(this.lastAppId)
      .subscribe((data: SteamGamesList) => {
        this.games.push(...data.response.apps);
        this.lastAppId = data.response.last_appid;
      });
    this.loadInfo();
  }

  loadInfo() {
    this.games.forEach((game) => {
      this.steamService.getGamesInfo(game.appid).subscribe((info) => {
        const id = game.appid.toString();
        info[id].success
          ? this.gamesInfo.push({
            app_id: id,
            data: info[id].data
          })
          : this.gamesInfo.push();
      });
    });
  }
}
