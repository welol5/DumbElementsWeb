import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RgbConrollerService {

  constructor(private http: HttpClient) { }

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
      'Content-Type': 'text/plain',
    });

    
    return this.http.post("http://192.168.1.7", body, {headers});
  }

}
