export interface steamGamesList {
    response : {
        apps: [steamGamesInfo],
        last_appid: number
    }
}

export type steamGamesInfo = {
    appid: number,
    name: string,
}