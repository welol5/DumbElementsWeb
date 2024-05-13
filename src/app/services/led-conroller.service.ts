import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantsService } from './constants.service';
import { BulkLEDUpdate, LEDAnimation } from '../models/ledUpdateRequest';
import { environment } from 'src/environment/enviornment';

@Injectable({
  providedIn: 'root'
})
export class LEDConrollerService {

  private controllerURL;

  constructor(private http: HttpClient, private constants: ConstantsService) { 
    this.controllerURL = constants.getControllerURL() + '/led';
  }

  setRGB(name: String, updates: BulkLEDUpdate): any{
    let body = {
      name: name,
      ledsToUpdate: updates
    }
    return this.http.post(this.controllerURL, body);
  }

  getLEDCount(): number{
    return environment.ledCount;
  }

  setLEDAnimation(name: string, animation: LEDAnimation){
    let body = animation;
    return this.http.post(this.controllerURL + '/animation', body);
  }

}
