/*
  LOCAL STORAGE SERVICE

  Si è optato per l'uso di un mocked local storage poichè l'SSR non supporta in local storage classico
*/

import { Injectable } from '@angular/core';
import { SteamApps } from '../interfaces/steamGamesList';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private store: { [key: string]: string } = {};

  constructor() {}

  getItem(key: string): string | null{
    return this.store[key] || null;
  }

  setItem(key: string, value: string){
    this.store[key] = value;
  }

  removeItem(key: string){
    delete this.store[key];
  }

  clear(){
    this.store= {};
  }

  isIn(key: string,game: SteamApps){
    const requiredData: SteamApps[] = JSON.parse(this.getItem(key) || '[]');
    return requiredData.some((localStorageGame: SteamApps) => localStorageGame.appid === game.appid)
  }
}
