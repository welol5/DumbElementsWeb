import { TestBed } from '@angular/core/testing';

import { LEDConrollerService } from './led-conroller.service';

describe('RgbConrollerService', () => {
  let service: LEDConrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LEDConrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
