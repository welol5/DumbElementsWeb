import { Injectable } from '@angular/core';
import { environment } from 'src/environment/enviornment';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }

  public getControllerURL (): string {
    return 'http://' + environment.controllerIp + ':' + environment.controllerPort + '/DumbElementsController';
  }
}
