/*
  STEAM GAME FETCH SERVICE

  Inizialmente inglobato nella HomePage è stato isolato data la sua mole massiccia di logica
*/


import { Injectable } from '@angular/core';
import { SteamAPIService } from './steam-api.service';
import { SteamApps, SteamGamesList } from '../interfaces/steamGamesList';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { AppData } from '../interfaces/steamGamesData';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SteamGameFetchService {
  storedGamesSubject: BehaviorSubject<SteamApps[]>;
  storedGames: SteamApps[];
  storedAppIds: {
    [page: number]: number;
  };

  constructor(
    private steamService: SteamAPIService,
    private localStorage: LocalStorageService
  ) {
    this.storedGames = [];
    this.storedAppIds = {0: 0};
    this.storedGamesSubject = new BehaviorSubject<SteamApps[]>(
      this.storedGames
    );
  }

  fetchInitGameData(page: number) {
    this.steamService
      .getGamesInfo(this.storedAppIds[page])
      .subscribe((data: SteamGamesList) => {
        const receivedApps = data.response.apps;
        if (
          receivedApps.every((app: SteamApps) =>
            this.storedGames.every(
              (storedGame: SteamApps) => app.appid !== storedGame.appid
            )
          )
        ) {
          this.storedGames = [...receivedApps];
          if (data.response.last_appid !== 0) {
            const nextKey =
              Math.max(...Object.keys(this.storedAppIds).map(Number)) + 1;
            this.storedAppIds[nextKey] = data.response.last_appid;
          }
          this.loadGameInfo();
        }
        this.storedGamesSubject.next([...this.storedGames]);
      });
  }

  loadGameInfo() {
    const requests = this.storedGames.map((game) =>
      this.steamService.getGamesData(game.appid)
    );
    forkJoin(requests).subscribe((responses) => {
      responses.forEach((info, index) => {
        const id = this.storedGames[index].appid.toString();
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
        this.storedGames[index].data = appData;
        this.localStorage.setItem(
          environment.storedGamesLabel,
          JSON.stringify(this.storedGames)
        );
        this.localStorage.setItem(
          environment.storedAppId,
          JSON.stringify(this.storedAppIds)
        );
      });
    });
  }
}
