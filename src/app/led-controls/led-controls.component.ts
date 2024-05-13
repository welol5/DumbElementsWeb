import { Component } from '@angular/core';
import { LEDConrollerService } from '../services/led-conroller.service';
import { NgModule } from '@angular/core';
import { ConstantsService } from '../services/constants.service';
import { BulkLEDUpdate, LEDUpdate, LedUpdateRequest } from '../models/ledUpdateRequest';

@Component({
  selector: 'app-led-controls',
  templateUrl: './led-controls.component.html',
  styleUrls: ['./led-controls.component.scss']
})
export class LEDControlsComponent {

  public name: string = '';
  public nameInvalid: boolean = false;

  public leds: string[];
  public selection: number = -1;
  public selectionStart: number = -1;
  public selectionEnd: number = -1;
  public selectionGroup: number[] = [];
  public ledStyles: any[];
  public currentColor: string;

  public actionList: LEDUpdate[] = [];
  public actionListMaxSize = 600;

  constructor(private ledService: LEDConrollerService) {
    this.leds = Array<string>(ledService.getLEDCount());
    this.ledStyles = Array<string>(ledService.getLEDCount());
    for (let i = 0; i < ledService.getLEDCount(); i++) {
      this.leds[i] = '#000000';
      this.ledStyles[i] = {
        'color': this.getTextColor('#000000'),
        'background-color': '#000000',
        'border': '1px solid #000000',
        'padding': '2px'
      };
    }
    this.currentColor = '#FFFFFF';
  }

  setColor() {
    // if(this.name == ''){
    //   this.nameInvalid = true;
    // }

    let bulkLEDUpdate: BulkLEDUpdate = new BulkLEDUpdate(this.actionList);

    this.ledService.setRGB(this.name, bulkLEDUpdate).subscribe((data: any) => {

    });
  }

  select(i: number, event: MouseEvent): void {
    if (this.selection == -1 || !event.shiftKey) {
      this.selection = i;
      this.selectionStart = -1;
      this.selectionEnd = -1;
      this.selectionGroup = [];
      this.selectionGroup.push(i);
      this.currentColor = '#FFFFFF';
      this.resetSelection();
      this.ledStyles[i] = {
        'color': this.getTextColor(this.leds[i]),
        'background-color': this.leds[i],
        'border': '3px solid #00FF00',
        'padding': '0px'
      }
    } else if (event.shiftKey) {
      if (i > this.selection) {
        this.selectionStart = this.selection;
        this.selectionEnd = i;
      } else {
        this.selectionStart = i;
        this.selectionEnd = this.selection;
      }
      this.selection = -1;
      this.resetSelection();

      for (let k = this.selectionStart; k <= this.selectionEnd; k++) {
        this.ledStyles[k] = {
          'color': this.getTextColor(this.leds[k]),
          'background-color': this.leds[k],
          'border': '3px solid #00FF00',
          'padding': '0px'
        }
      }
    } else if (event.ctrlKey) {
      this.selectionGroup.push(i);
    }
  }

  private resetSelection(): void {
    for (let k = 0; k < this.ledService.getLEDCount(); k++) {
      this.ledStyles[k] = {
        'color': this.getTextColor(this.leds[k]),
        'background-color': this.leds[k],
        'border': '1px solid #000000',
        'padding': '2px'
      }
    }
  }

  updateColors() {

    if (this.selectionStart == -1) {
      this.selectionStart = this.selection;
      this.selectionEnd = this.selection;
      this.selection = -1;
    }

    for (let i = this.selectionStart; i <= this.selectionEnd; i++) {
      this.ledStyles[i] = this.ledStyles[i] = {
        'color': this.getTextColor(this.currentColor),
        'background-color': this.currentColor,
        'border': '3px solid #00FF00',
        'padding': '0px'
      }
    }

    this.saveColors();

    let r = parseInt(this.currentColor.substring(1, 3), 16);
    let g = parseInt(this.currentColor.substring(3, 5), 16);
    let b = parseInt(this.currentColor.substring(5), 16);
    if (this.actionList.length > 0 && this.selectionStart == this.actionList[this.actionList.length - 1].ledStart && this.selectionEnd == this.actionList[this.actionList.length - 1].ledEnd) {
      this.actionList[this.actionList.length - 1].r = r;
      this.actionList[this.actionList.length - 1].g = g;
      this.actionList[this.actionList.length - 1].b = b;
    } else {
      this.actionList.push(new LEDUpdate(this.selectionStart, this.selectionEnd, r, g, b));
    }

    if (this.actionList.length > this.actionListMaxSize) {
      this.actionList.shift();
    }
  }

  saveColors(): void {
    for (let i = this.selectionStart; i <= this.selectionEnd; i++) {
      this.leds[i] = '' + this.currentColor;
    }
  }

  removeAction(index: number): void {
    this.actionList.splice(index, 1);
  }

  /**
   * This algorithm was found online.
   * @param hexColor the #XXXXXX string value of the color
   * @returns the luminance value
   */
  calculateLuminance(hexColor: string): number {

    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5), 16);

    let RsRGB = r / 255;
    let GsRGB = g / 255;
    let BsRGB = b / 255;

    let R, G, B;
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = ((RsRGB + 0.055) / 1.055) ^ 2.4;
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = ((GsRGB + 0.055) / 1.055) ^ 2.4;
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = ((BsRGB + 0.055) / 1.055) ^ 2.4;
    }

    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  convertHSLToHex(h: number, s:number, v:number): number[] {

    let c = v*s;
    let x = c* (1- Math.abs(((h/60)%2) -1));
    let m = v-c;

    let rp,gp,bp;
    if(h >= 0 && h <60){
      rp = c;
      gp = x;
      bp = 0;
    } else if(h >= 60 && h < 120){
      rp = x;
      gp = c;
      bp = 0;
    } else if(h >= 120 && h < 180){
      rp = 0;
      gp = c;
      bp = x;
    } else if(h >= 180 && h < 240){
      rp = 0;
      gp = x;
      bp = c;
    } else if(h >= 240 && h < 300){
      rp = x;
      gp = 0;
      bp = c;
    } else{
      rp = c;
      gp = 0;
      bp = x;
    }

    let r = (rp+m)*255;
    let g = (gp+m)*255;
    let b = (bp+m)*255;

    return [r,g,b];
  }

  getTextColor(color: string): string {
    let whiteContrastRatio = (this.calculateLuminance('#FFFFFF') + 0.05) / (this.calculateLuminance(color) + 0.05);
    let blackContrastRatio = (this.calculateLuminance(color) + 0.05) / (this.calculateLuminance('#000000') + 0.05);
    if (whiteContrastRatio > blackContrastRatio) {
      return '#FFFFFF';
    } else {
      return '#000000';
    }
  }

  rainbow(offset = 0): void {
    let status: LEDUpdate[] = [];
    for (let i = 0; i < this.ledService.getLEDCount(); i++) {
      let h = (i+offset) % 360;
      let s = 1;
      let v = 0.5;
      
      let color = this.convertHSLToHex(h,s,v)
      let ledUpdate: LEDUpdate = new LEDUpdate(i,i,color[0],color[1],color[2]);
      status.push(ledUpdate);
    }
    let update: BulkLEDUpdate = new BulkLEDUpdate(status);
    this.ledService.setRGB('weird', update).subscribe((data: any) => {

    });
  }

  public continueAnimation: boolean = false;
  private animationOffset: number = 0;
  rainbowAnimation(): void {
    console.log('animation', this.continueAnimation);
    if(this.continueAnimation) {
      this.rainbow(this.animationOffset);
      this.animationOffset ++;
      setTimeout(()=> {this.rainbowAnimation()}, 500);
    }
  }

  toggleAnimation(): void {
    if(this.continueAnimation){
      this.continueAnimation = false;
    } else {
      this.continueAnimation = true;
    }
  }


}
