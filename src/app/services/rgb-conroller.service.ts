import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class RgbConrollerService {

  private controllerURL;

  constructor(private http: HttpClient, private constants: ConstantsService) { 
    this.controllerURL = constants.getControllerURL() + '/led';
  }

  setRGB(start: number, end: number, color: string): any{
    let rgbValues = color.substring(4,color.length-1).split(',');
    let body = {
      ledStart: start,
      ledEnd: end,
      r: parseInt(rgbValues[0]),
      g: parseInt(rgbValues[1]),
      b: parseInt(rgbValues[2])
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080/'
    });

    console.log(this.controllerURL);
    
    return this.http.post(this.controllerURL, body, {headers});
  }

}
