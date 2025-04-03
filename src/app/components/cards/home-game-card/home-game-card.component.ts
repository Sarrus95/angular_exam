import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SteamApps } from '../../../interfaces/steamGamesList';

@Component({
  selector: 'app-home-game-card',
  imports: [],
  templateUrl: './home-game-card.component.html',
  styleUrl: './home-game-card.component.scss'
})
export class GameCardComponent {
  @Input() game!: SteamApps;
  @Output() modalOpener = new EventEmitter<SteamApps>;

  openModal(){
    this.modalOpener.emit(this.game);
  }
}
