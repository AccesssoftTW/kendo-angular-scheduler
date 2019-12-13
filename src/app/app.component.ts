import { Component } from '@angular/core';
import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { EditService } from './edit.service';

// 這邊是載入時區
import '@progress/kendo-date-math/tz/America/New_York';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // 預設日期
  public selectedDate: Date = new Date('2013-06-10T00:00:00');

  // 要提供給 kendo 編輯用的
  public formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, public editService: EditService) {
  }

  public ngOnInit(): void {

    // 先讀取資料
    this.editService.read();
  }

  // Note the use of a lambda function in order to bind `this`
  public createFormGroup = (args: CreateFormGroupArgs): FormGroup => {
    const dataItem = args.dataItem;

    this.formGroup = this.formBuilder.group({
      'TaskID': args.isNew ? 0 : dataItem.TaskID,
      'Start': [dataItem.Start, Validators.required],
      'End': [dataItem.End, Validators.required],
      'StartTimezone': [dataItem.StartTimezone],
      'EndTimezone': [dataItem.EndTimezone],
      'IsAllDay': dataItem.IsAllDay,
      'Title': dataItem.Title,
      'Description': dataItem.Description,
      'RecurrenceRule': dataItem.RecurrenceRule,
      'RecurrenceID': dataItem.RecurrenceID
    });

    return this.formGroup;
  }
}
