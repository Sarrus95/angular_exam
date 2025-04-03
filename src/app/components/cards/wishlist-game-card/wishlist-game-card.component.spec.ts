import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistGameCardComponent } from './wishlist-game-card.component';

describe('WishlistGameCardComponent', () => {
  let component: WishlistGameCardComponent;
  let fixture: ComponentFixture<WishlistGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
