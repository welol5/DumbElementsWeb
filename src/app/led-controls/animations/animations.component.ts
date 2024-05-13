import { Component } from '@angular/core';
import { LEDAnimation } from 'src/app/models/ledUpdateRequest';
import { LEDConrollerService } from 'src/app/services/led-conroller.service';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent {

  public r: string = '';
  public g: string = '';
  public b: string = '';

  constructor(private rgb:LEDConrollerService){
    
  }

  public submitAnimationFunctions(): void{
    this.rgb.setLEDAnimation('Will', new LEDAnimation(this.r, this.g, this.b)).subscribe((data) => {

    })
  }
  
}
