import { TestBed } from '@angular/core/testing';

import { RgbConrollerService } from './rgb-conroller.service';

describe('RgbConrollerService', () => {
  let service: RgbConrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RgbConrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
