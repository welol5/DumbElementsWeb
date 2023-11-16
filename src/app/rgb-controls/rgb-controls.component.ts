import { Component } from '@angular/core';
import { RgbConrollerService } from '../services/rgb-conroller.service';
import { NgModule } from '@angular/core';
import { ConstantsService } from '../services/constants.service';
import { BulkLEDUpdate, LEDUpdate } from '../models/ledUpdateRequest';

@Component({
  selector: 'app-rgb-controls',
  templateUrl: './rgb-controls.component.html',
  styleUrls: ['./rgb-controls.component.scss']
})
export class RgbControlsComponent {

  public name: string = '';
  public nameInvalid: boolean = false;
  public colors: string[];
  public colors2: string[];
  public chunkCount: number = 3;
  public chunks: any[] = [];


  constructor(private rgb: RgbConrollerService){
    this.colors = Array<string>(this.chunkCount);
    this.colors2 = Array<string>(this.chunkCount);
    this.chunks = Array(this.chunkCount*2);
    for(let i = 0; i < this.chunkCount; i++){
      this.colors[i] = 'rgb(0,0,0)';
      this.colors2[i] = '#000000';
      this.chunks[(i*2)] = i*50;
      this.chunks[(i*2)+1] = ((i+1)*50) -1;
    }
  }

  setColor() {
    // if(this.name == ''){
    //   this.nameInvalid = true;
    // }

    let bulkLEDUpdate: BulkLEDUpdate = new BulkLEDUpdate();
    for(let i = 0; i < this.chunkCount; i++){
      // let rgbValues = this.colors[i].substring(4,this.colors[i].length-1).split(',');
      let rgbValues = this.colors2[i].substring(1);
      let r = parseInt(rgbValues.substring(0,2), 16);
      let g = parseInt(rgbValues.substring(2,4), 16);
      let b = parseInt(rgbValues.substring(4), 16);
      console.log(rgbValues, r, g, b);
      let update: LEDUpdate = new LEDUpdate(this.chunks[(i*2)], this.chunks[(i*2)+1], r, g, b);
      bulkLEDUpdate.status.push(update);
    }

    this.rgb.setRGB(this.name, bulkLEDUpdate).subscribe((data: any) => {

    });
  }
}
