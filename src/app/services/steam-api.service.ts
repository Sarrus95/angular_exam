import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { steamGamesList } from '../interfaces/steamGamesList';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamAPIService {
  private baseUrl = environment.baseUrl;
  private gamesRes = environment.gamesRes;
  private steamApiKey = environment.steamApiKey;
  private resultOptions = environment.resultOptions;

  constructor(private http: HttpClient) {}

  getGames(last_appid: number,resultLimit = environment.defaultResults): Observable<steamGamesList>{
    return this.http.get<steamGamesList>(`${this.baseUrl + this.gamesRes + this.steamApiKey 
      + `&last_appid=${last_appid}` + this.resultOptions + resultLimit}`)
  }
}
