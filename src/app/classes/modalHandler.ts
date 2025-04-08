/*
  MODAL HANDLER CLASS

  Classe in comune alle pagine di visualizzazione
  HOME/WISHLIST/LIBRARY

  Abilita la corretta gestione della modal
*/

import { SteamApps } from '../interfaces/steamGamesList';

export class ModalHandler {
  selectedGame!: SteamApps;
  viewModal: boolean = false;

  openModalHandler(game: SteamApps): void {
    this.selectedGame = game;
    this.viewModal = true;
  }

  closeModalHandler(): void {
    this.viewModal = false;
  }
}