export interface SteamGamesList {
    response : {
        apps: [SteamApps],
        last_appid: number
    }
}

export interface SteamApps {
    appid: number,
    name: string,
}