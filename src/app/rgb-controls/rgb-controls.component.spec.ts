import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbControlsComponent } from './rgb-controls.component';

describe('RgbControlsComponent', () => {
  let component: RgbControlsComponent;
  let fixture: ComponentFixture<RgbControlsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RgbControlsComponent]
    });
    fixture = TestBed.createComponent(RgbControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
