/*
  CATEGORIES SERVICE

  Permette la comunicazione tra la sezione delle categorie della Navbar e le pagine di visualizzazione
  HOME/WISHLIST/LIBRARY
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private selectedCategorySource = new BehaviorSubject<string | null>(null);
  selectedCategory = this.selectedCategorySource.asObservable();

  selectCategory(category: string) {
    this.selectedCategorySource.next(category);
  }

  clearCategory(){
    this.selectedCategorySource.next(null)
  }
}