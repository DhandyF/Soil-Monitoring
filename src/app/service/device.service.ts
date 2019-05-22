import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Device } from '../models/device';
import { isNgTemplate } from '@angular/compiler';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  deviceRecordCollection: AngularFirestoreCollection<Device>;
  records: Observable<Device[]>;
  constructor(private db:AngularFirestore) { 
    this.records = this.db.collection('device').valueChanges();
  }
  getDevices() {
    return this.records;
  }
}
