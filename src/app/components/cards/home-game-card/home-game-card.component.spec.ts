import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGameCardComponent } from './home-game-card.component';

describe('HomeGameCardComponent', () => {
  let component: HomeGameCardComponent;
  let fixture: ComponentFixture<HomeGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
