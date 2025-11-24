import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {HoursTimes} from '@core/type/hours-times';

@Component({
  selector: 'app-reminder-feature',
  standalone: true,
  templateUrl: './reminder.html',
  styleUrl: './reminder.scss',
})
export class Reminder implements OnInit, OnChanges {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  @Input() inputValue: HoursTimes | null = null;

  hour: string = '';
  minute: string = '';

  hours = Array(24).fill(0);
  minutes = Array(12).fill(0);

  ngOnInit() {
    this.validChange.emit(true);
  }

  ngOnChanges() {
    if (this.inputValue) {
      this.hour = this.inputValue.hour;
      this.minute = this.inputValue.minute;
    }
  }

  onHourChange(event: any) {
    this.hour = event.target.value;
    this.emitState();

  }

  onMinuteChange(event: any) {
    this.minute = event.target.value;
    this.emitState();
  }

  emitState(): void {
    if ((this.hour.length && !this.minute.length) || (!this.hour.length && this.minute.length)) {
      this.validChange.emit(false);
    } else if (!this.hour.length && !this.minute.length) {
      this.validChange.emit(true);
      this.stateChange.emit({
        key: 'reminder',
        value: null
      })
    } else {
      this.validChange.emit(true);
      this.stateChange.emit({
        key: 'reminder',
        value: {
          hour: this.hour,
          minute: this.minute
        }
      })
    }
  }
}
