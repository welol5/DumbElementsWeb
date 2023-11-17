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

  public leds: string[];
  public selection: number = -1;
  public selectionStart: number = -1;
  public selectionEnd: number = -1;
  public ledStyles: any[];
  public currentColor: string;

  public actionList: LEDUpdate[] = [];
  public actionListMaxSize = 20;

  constructor(private rgb: RgbConrollerService) {
    this.leds = Array<string>(rgb.getLEDCount());
    this.ledStyles = Array<string>(rgb.getLEDCount());
    for (let i = 0; i < rgb.getLEDCount(); i++) {
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

    this.rgb.setRGB(this.name, bulkLEDUpdate).subscribe((data: any) => {

    });
  }

  select(i: number): void {
    if (this.selection == -1) {
      this.selection = i;
      this.currentColor = '#FFFFFF';
      for (let k = 0; k < this.rgb.getLEDCount(); k++) {
        this.ledStyles[k] = {
          'color': this.getTextColor(this.leds[k]),
          'background-color': this.leds[k],
          'border': '1px solid #000000',
          'padding': '2px'
        }
      }
      this.ledStyles[i] = {
        'color': this.getTextColor(this.leds[i]),
        'background-color': this.leds[i],
        'border': '3px solid #00FF00',
        'padding': '0px'
      }
    } else {
      if (i > this.selection) {
        this.selectionStart = this.selection;
        this.selectionEnd = i;
      } else {
        this.selectionStart = i;
        this.selectionEnd = this.selection;
      }
      this.selection = -1;

      for (let k = 0; k < this.rgb.getLEDCount(); k++) {
        this.ledStyles[k] = {
          'color': this.getTextColor(this.leds[k]),
          'background-color': this.leds[k],
          'border': '1px solid #000000',
          'padding': '2px'
        }
      }

      for (let k = this.selectionStart; k <= this.selectionEnd; k++) {
        this.ledStyles[k] = {
          'color': this.getTextColor(this.leds[k]),
          'background-color': this.leds[k],
          'border': '3px solid #00FF00',
          'padding': '0px'
        }
      }

    }
  }

  updateColors() {
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
      this.actionList[this.actionList.length-1].r = r;
      this.actionList[this.actionList.length-1].g = g;
      this.actionList[this.actionList.length-1].b = b;
    } else {
      this.actionList.push(new LEDUpdate(this.selectionStart, this.selectionEnd, r, g, b));
    }

    if(this.actionList.length > this.actionListMaxSize){
      this.actionList.shift();
    }
  }

  saveColors(): void {
    for (let i = this.selectionStart; i <= this.selectionEnd; i++) {
      this.leds[i] = '' + this.currentColor;
    }
  }

  removeAction(index : number): void {
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

  getTextColor(color: string): string {
    let whiteContrastRatio = (this.calculateLuminance('#FFFFFF') + 0.05) / (this.calculateLuminance(color) + 0.05);
    let blackContrastRatio = (this.calculateLuminance(color) + 0.05) / (this.calculateLuminance('#000000') + 0.05);
    if (whiteContrastRatio > blackContrastRatio) {
      return '#FFFFFF';
    } else {
      return '#000000';
    }
  }
}
