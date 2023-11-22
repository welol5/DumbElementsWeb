import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { BulkLEDUpdate } from '../models/ledUpdateRequest';
import { environment } from 'src/environment/enviornment';

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

    console.log(this.controllerURL);
    
    return this.http.post(this.controllerURL, body);
  }

  getLEDCount(): number{
    return environment.ledCount;
  }

}
