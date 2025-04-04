import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SteamApps } from '../../../interfaces/steamGamesList';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-base-game-card',
  imports: [],
  templateUrl: './base-game-card.component.html',
  styleUrl: './base-game-card.component.scss'
})
export class BaseGameCardComponent {
  @Input() game!: SteamApps;
  @Output() modalOpener = new EventEmitter<SteamApps>;

  constructor(protected localStorage: LocalStorageService){}

  openModal(){
    this.modalOpener.emit(this.game);
  }
}
