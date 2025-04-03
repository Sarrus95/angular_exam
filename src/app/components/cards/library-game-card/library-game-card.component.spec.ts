import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryGameCardComponent } from './library-game-card.component';

describe('LibraryGameCardComponent', () => {
  let component: LibraryGameCardComponent;
  let fixture: ComponentFixture<LibraryGameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryGameCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
