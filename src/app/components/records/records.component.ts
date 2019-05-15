import { Component, OnInit } from '@angular/core';
import { RecordService } from '../../services/record.service';
import { Record } from '../../models/Record';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  item: Record[];
  record: Record;
  constructor(public recordService: RecordService) { }

  ngOnInit() {
    this.recordService.getItems().subscribe(items => {
      console.log(items);
      this.item = items;
      this.record = this.item[0];
      console.log(this.record.temperature);
    });
  }

}
