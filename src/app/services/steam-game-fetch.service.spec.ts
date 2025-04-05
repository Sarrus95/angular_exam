import { TestBed } from '@angular/core/testing';

import { SteamGameFetchService } from './steam-game-fetch.service';

describe('SteamGameFetchService', () => {
  let service: SteamGameFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SteamGameFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
