import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { SteamGamesList } from '../interfaces/steamGamesList';
import { SteamGamesData } from '../interfaces/steamGamesData';


@Injectable({
  providedIn: 'root'
})
export class SteamAPIService {
  private gamesRes = environment.gamesRes;
  private steamApiKey = environment.steamApiKey;
  private resultOptions = environment.resultOptions;
  private gameInfo = environment.gameInfo;
  private gameInfoLang = environment.gameInfoLang;

  constructor(private http: HttpClient) {}

  getGamesInfo(last_appid: number,resultLimit = environment.defaultResults): Observable<SteamGamesList>{
    return this.http.get<SteamGamesList>(`${this.gamesRes + this.steamApiKey 
      + `&last_appid=${last_appid}` + this.resultOptions + resultLimit}`)
  }

  getGamesData(id: number): Observable<SteamGamesData>{
    return this.http.get<SteamGamesData>(`${this.gameInfo + id + this.gameInfoLang}`)
  }
}
