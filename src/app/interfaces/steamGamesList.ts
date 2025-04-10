/*
  STEAM GAMES LIST

  Mappatura primaria della chiamata API appdetails
*/

import { AppData } from "./steamGamesData"

export interface SteamGamesList {
    response : {
        apps: [SteamApps],
        last_appid: number
    }
}

export interface SteamApps {
    appid: number,
    data: AppData | null
}