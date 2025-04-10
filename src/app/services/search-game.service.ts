/*
  CATEGORIES SERVICE

  Permette la comunicazione tra la barra di ricerca della Navbar e le pagine di visualizzazione
  HOME/WISHLIST/LIBRARY
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchGameService {
  private searchedGameSource = new BehaviorSubject<string | null>(null);
  searchedGame = this.searchedGameSource.asObservable();

  searchGame(search: string) {
    this.searchedGameSource.next(search);
  }
}