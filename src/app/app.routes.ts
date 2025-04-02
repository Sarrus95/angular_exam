import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(
        module => module.HomeComponent
      ),
  },
  {
    path: 'wishlist',
    loadComponent: () =>
        import('./pages/wishlist/wishlist.component').then(
            module => module.WishlistComponent
        )
  },
  {
    path: 'library',
    loadComponent: () =>
        import('./pages/library/library.component').then(
            module => module.LibraryComponent
        )
  },
];
