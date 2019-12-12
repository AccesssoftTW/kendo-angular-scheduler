import { Component } from '@angular/core';
import { SchedulerEvent, CreateFormGroupArgs } from '@progress/kendo-angular-scheduler';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { EditService } from './edit.service';
import '@progress/kendo-date-math/tz/regions/Europe';
import '@progress/kendo-date-math/tz/regions/NorthAmerica';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public selectedDate: Date = new Date('2013-06-10T00:00:00');
  public formGroup: FormGroup;

  //   public events: SchedulerEvent[] = [{
  //     id: 1,
  //     title: 'Breakfast',
  //     start: new Date('2018-10-22T09:00:00'),
  //     end: new Date('2018-10-22T09:30:00'),
  //     recurrenceRule: 'FREQ=DAILY;COUNT=5;'
  // }];

  // public group: any = {
  //   resources: ['Rooms'],
  //   orientation: 'horizontal'
  // };

  // public resources: any[] = [{
  //   name: 'Rooms',
  //   data: [
  //     { text: 'Meeting Room 101', value: 1, color: '#6eb3fa' },
  //     { text: 'Meeting Room 201', value: 2, color: '#f58a8a' }
  //   ],
  //   field: 'roomId',
  //   valueField: 'value',
  //   textField: 'text',
  //   colorField: 'color'
  // }, {
  //   name: 'Attendees',
  //   data: [
  //     { text: 'Alex', value: 1, color: '#f8a398' },
  //     { text: 'Bob', value: 2, color: '#51a0ed' },
  //     { text: 'Charlie', value: 3, color: '#56ca85' }
  //   ],
  //   multiple: true,
  //   field: 'attendees',
  //   valueField: 'value',
  //   textField: 'text',
  //   colorField: 'color'
  // }];

  constructor(private formBuilder: FormBuilder, public editService: EditService) {
  }

  public ngOnInit(): void {
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
