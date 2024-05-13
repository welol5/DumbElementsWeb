import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControlsContainerComponent } from './led-controls-container.component';

describe('LedControlsContainerComponent', () => {
  let component: LedControlsContainerComponent;
  let fixture: ComponentFixture<LedControlsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LedControlsContainerComponent]
    });
    fixture = TestBed.createComponent(LedControlsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
