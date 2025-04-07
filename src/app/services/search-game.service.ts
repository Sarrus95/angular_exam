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