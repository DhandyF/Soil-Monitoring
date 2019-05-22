import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Device }         from '../models/device';
import { DeviceService }  from '../service/device.service';

@Component({
  selector: 'app-detail-device',
  templateUrl: './detail-device.component.html',
  styleUrls: ['./detail-device.component.css']
})
export class DetailDeviceComponent implements OnInit {
  device: Device;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDevice();
  }

  getDevice(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.deviceService.getDevice(id)
      .subscribe(device => this.device = device);
  }

  goBack(): void {
    this.location.back();
  }
}
0.6056659 
0.000168240527778