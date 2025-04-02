import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SteamApps } from '../../interfaces/steamGamesList';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.scss'
})
export class InfoCardComponent {
  @Input() game: SteamApps | null;
  @Input() isVisible: boolean;
  @Output() modalCloser = new EventEmitter<void>;

  constructor(){
    this.isVisible = false;
    this.game = null;
  }

  closeModal(){
    console.log("button clicked");
    this.modalCloser.emit();
  }
}
