import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Record } from '../models/Record';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  deviceRecordCollection: AngularFirestoreCollection<Record>;
  records: Observable<Record[]>;
  constructor(private db:AngularFirestore) { 
    this.records = this.db.collection('device/device1/record', ref => ref.orderBy('created_at','desc').limit(1)).valueChanges();
  }

  getItems() {
    return this.records;
  }
}
