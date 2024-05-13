import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LEDControlsComponent } from './led-controls.component';

describe('RgbControlsComponent', () => {
  let component: LEDControlsComponent;
  let fixture: ComponentFixture<LEDControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LEDControlsComponent]
    });
    fixture = TestBed.createComponent(LEDControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
