import { Component } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CategoryService } from '../../services/categories-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
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

  constructor(
    private localStorage: LocalStorageService,
    private categoryService: CategoryService,
    private routerService: Router
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
  }

  ngOnInit() {
    this.routerService.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.favourites.optionVisible = this.routerService.url.includes('/library');
      }
    });
  }
  

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
    this.favourites.label = this.favourites.onlyFavourites ? 'Solo Preferiti' : 'Tutti';
  }  
}
