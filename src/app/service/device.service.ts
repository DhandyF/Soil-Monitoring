import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Device } from '../models/device';
import { Devices } from '../models/mock-devices';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor() { }

  getDevices(): Observable<Device[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(Devices);
  }

  getDevice(id: number): Observable<Device> {
    return of(Devices.find(device => device.id === id));
  }
}
