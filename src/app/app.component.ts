import { Component } from '@angular/core';
import { SteamAPIService } from './services/steam-api.service';
import { steamGamesList,steamGamesInfo } from './interfaces/steamGamesList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  games : steamGamesInfo[];
  lastAppId: number;

  constructor(private steamService: SteamAPIService){
    this.games = []
    this.lastAppId = 0;
  }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.games = [];
    this.steamService.getGames(this.lastAppId).subscribe((data: steamGamesList) => {
      this.games.push(...data.response.apps);
      this.lastAppId = data.response.last_appid;
    })
  }
}
