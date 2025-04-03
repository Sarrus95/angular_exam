import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SteamApps } from '../../../interfaces/steamGamesList';

@Component({
  selector: 'app-info-game-card',
  imports: [],
  templateUrl: './info-game-card.component.html',
  styleUrl: './info-game-card.component.scss'
})
export class InfoGameCardComponent {
  @Input() game: SteamApps | null;
  @Input() isVisible: boolean;
  @Output() modalCloser = new EventEmitter<void>;

  constructor(){
    this.isVisible = false;
    this.game = null;
  }

  closeModal(){
    this.modalCloser.emit();
  }
}
