import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reminder',
  standalone: true,
  templateUrl: './reminder.html',
  styleUrl: './reminder.scss',
})
export class Reminder {

  @Input() hour: string = '';
  @Input() minute: string = '';

  @Output() hourChange = new EventEmitter<string>();
  @Output() minuteChange = new EventEmitter<string>();

  hours = Array(24).fill(0);
  minutes = Array(12).fill(0);

  onHourChange(event: any) {
    this.hour = event.target.value;
    this.hourChange.emit(this.hour);
  }

  onMinuteChange(event: any) {
    this.minute = event.target.value;
    this.minuteChange.emit(this.minute);
  }
}
