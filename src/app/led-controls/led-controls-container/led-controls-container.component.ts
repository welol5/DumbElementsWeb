import { Component } from '@angular/core';

@Component({
  selector: 'app-led-controls-container',
  templateUrl: './led-controls-container.component.html',
  styleUrls: ['./led-controls-container.component.scss']
})
export class LedControlsContainerComponent {

  selectedTab = 0;

  selectTab(tab: number){
    this.selectedTab = tab;
  }
}
