import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-reminder',
  standalone: true,
  templateUrl: './reminder.html',
  styleUrl: './reminder.scss',
})
export class Reminder implements OnInit {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  @Input() hour: string = '';
  @Input() minute: string = '';

  hours = Array(24).fill(0);
  minutes = Array(12).fill(0);

  ngOnInit() {
    this.validChange.emit(true);
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
    } else {
      this.validChange.emit(true);
      this.stateChange.emit({
        key: 'reminder',
        value:{
          hour: this.hour,
          minute: this.minute
        }
      })
    }
  }
}
