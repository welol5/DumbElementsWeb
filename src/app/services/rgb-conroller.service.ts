import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { BulkLEDUpdate } from '../models/ledUpdateRequest';

@Injectable({
  providedIn: 'root'
})
export class RgbConrollerService {

  private controllerURL;

  constructor(private http: HttpClient, private constants: ConstantsService) { 
    this.controllerURL = constants.getControllerURL() + '/led';
  }

  setRGB(name: String, updates: BulkLEDUpdate): any{
    console.log('send update');

    let body = {
      name: name,
      ledsToUpdate: updates
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://192.168.1.69:8080/'
    });

    console.log(this.controllerURL);
    
    return this.http.post(this.controllerURL, body, {headers});
  }

  getLEDCount(): number{
    return 150;
  }

}
