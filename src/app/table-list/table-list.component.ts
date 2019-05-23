import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Device }         from '../models/device';
import { DeviceService }  from '../service/device.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  device: Device[];

  constructor(
    private route: ActivatedRoute,
    private deviceService: DeviceService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getDevices();
  }

  getDevices(): void {
    this.deviceService.getDevices().subscribe(items => {
      this.device = items;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
