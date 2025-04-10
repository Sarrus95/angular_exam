ITA

# Esame

Progetto per Esame Finale - Materia Angular
Componenti gruppo
1)Rosario Zago
2)Angelo Nicolaci
3)Riccardo Iudici
4)Noemi Palazzo

# Descrizione

App che mima una vetrina dalla quale poter acquistare videogiochi da Steam

# Features

- Visualizzare info dei giochi(titolo,breve descrizione,genere,voto Metacritic,prezzo)
- Filtrare i risultati tramite genere e/o titolo
- Aggiungere i videogiochi ad una Wishlist
- Aggiungere i videogiochi ad una Libreria (marcandoli anche come preferiti)

# API

Per recuperare i dati dei giochi da Steam, sono state utilizzate le seguenti API:

- IStoreService/GetAppList --> https://partner.steamgames.com/doc/webapi/isteamapps
- api/appdetails --> https://steamapi.xpaw.me/#IStoreService

Purtroppo, la documentazione su "appdetails" è praticamente assente: per quanto sembra che si possano ricercare dati per più id, questo parametro funziona solo in combaciata con un filtro su un determinato parametro (prezzo,genere...)

# Supporting Squad

Il nostro progetto utilizza le seguenti librerie esterne:

- Pure CSS --> https://pure-css.github.io/