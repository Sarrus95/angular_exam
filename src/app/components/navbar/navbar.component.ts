import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';
import { CategoryService } from '../../services/categories-service.service';
import { SearchGameService } from '../../services/search-game.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  pages = [
    { name: 'Home', router: '/' },
    { name: 'Wishlist', router: '/wishlist' },
    { name: 'Library', router: '/library' },
  ];
  categories: string[];
  favourites: {
    optionVisible: boolean;
    onlyFavourites: boolean;
    label: string;
  };
  searchForm: FormGroup;

  constructor(
    private localStorage: LocalStorageService,
    private routerService: Router,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private searchGameService: SearchGameService
  ) {
    this.categories = [
      'Tutti',
      'Azione',
      'Avventura',
      'GDR',
      'Indie',
      'Simulazione',
      'Strategia',
      'Free-to-Play',
    ];
    this.favourites = {
      optionVisible: false,
      onlyFavourites: true,
      label: 'Tutti',
    };
    this.searchForm = this.formBuilder.group({
      search: [''],
    });

    this.searchGame();
  }

  ngOnInit() {
    this.routerService.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.favourites.optionVisible =
          this.routerService.url.includes('/library');
      }
    });
  }

  //Funzione per testare il corretto funzionamento del local storage
  clearStorage() {
    this.localStorage.clear();
    alert('LocalStorage Cleared!');
  }

  categorySender(category: string) {
    if (this.routerService.url === 'library') {
      this.favourites.optionVisible = true;
    } else {
      this.favourites.optionVisible = false;
    }
    this.categoryService.selectCategory(category);
  }

  toggleOnlyFavourites() {
    this.favourites.onlyFavourites = !this.favourites.onlyFavourites;
    this.favourites.label = this.favourites.onlyFavourites
      ? 'Solo Preferiti'
      : 'Tutti';
  }

  searchGame() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300))
      .subscribe((search: string) => {
        this.searchGameService.searchGame(search.toLowerCase());
      });
  }
}