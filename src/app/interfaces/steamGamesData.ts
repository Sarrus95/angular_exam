/*
  STEAM GAME DATA INTERFACE

  Mappatura della chiave "data" della chiamata API appdetails
*/

export interface SteamGamesData {
    [app_id: string]: {
        success: boolean,
        data: AppData
    }
}

export interface AppData {
    name: string,
    short_description: string,
    header_image: string,
    price_overview: {
        final_formatted: string
    },
    metacritic: {
        score: number
    },
    genres: GameGenres[],
    release_date: GameReleaseDate,
    support_info: {
        url: string
    }
}

export interface GameGenres {
    description: string
}

export interface GameReleaseDate {
    coming_soon: boolean,
    date: string,
}