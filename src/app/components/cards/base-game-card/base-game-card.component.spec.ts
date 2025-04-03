import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGameCardComponent } from './base-game-card.component';

describe('BaseGameCardComponent', () => {
  let component: BaseGameCardComponent;
  let fixture: ComponentFixture<BaseGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
