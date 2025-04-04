import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { CategoryService } from '../../services/categories-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  pages =  [
    {name: "Home",router: "/"},
    {name: "Wishlist",router: "/wishlist"},
    {name: "Library",router: "/library"},
  ];
  categories = ["Azione","Avventura","Indie","Free-To-Play"];

  constructor(private localStorage: LocalStorageService,private categoryService: CategoryService){}

  clearStorage(){
    this.localStorage.clear();
    alert("LocalStorage Cleared!");
  }

  categorySender(category: string){
    this.categoryService.selectCategory(category);
  }
}
