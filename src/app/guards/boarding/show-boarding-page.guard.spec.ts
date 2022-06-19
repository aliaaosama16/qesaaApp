import { TestBed } from '@angular/core/testing';

import { ShowBoardingPageGuard } from './show-boarding-page.guard';

describe('ShowBoardingPageGuard', () => {
  let guard: ShowBoardingPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShowBoardingPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
