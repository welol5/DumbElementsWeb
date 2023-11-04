import { Component } from '@angular/core';
import { RgbConrollerService } from '../services/rgb-conroller.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-rgb-controls',
  templateUrl: './rgb-controls.component.html',
  styleUrls: ['./rgb-controls.component.scss']
})
export class RgbControlsComponent {

  public color: string = 'rgb(0,0,0)';
  public ledStart: number = 0;
  public ledEnd: number = 0;

  constructor(private rgb: RgbConrollerService){
    
  }

  setColor(){
    this.rgb.setRGB(this.ledStart, this.ledEnd, this.color).subscribe((data: {}) => {
    });
  }
}
