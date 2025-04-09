import { Injectable } from "@angular/core";
import { SteamApps } from "../interfaces/steamGamesList";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }

  isIn(key: string, game: SteamApps): boolean {
    const requiredData: SteamApps[] = JSON.parse(this.getItem(key) || '[]');
    return requiredData.some((localStorageGame: SteamApps) => localStorageGame.appid === game.appid);
  }
}