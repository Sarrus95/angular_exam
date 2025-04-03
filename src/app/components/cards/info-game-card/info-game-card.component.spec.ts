import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGameCardComponent } from './info-game-card.component';

describe('InfoGameCardComponent', () => {
  let component: InfoGameCardComponent;
  let fixture: ComponentFixture<InfoGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
