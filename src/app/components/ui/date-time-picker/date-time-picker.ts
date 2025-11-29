import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faCalendar, faSortDown} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [FormsModule, FaIconComponent],
  templateUrl: './date-time-picker.html',
  styleUrls: ['./date-time-picker.scss']
})
export class DateTimePicker {
  protected readonly faCalendar = faCalendar;
  protected readonly faSortDown = faSortDown;

  // -------------------------
  // Inputs
  // -------------------------
  @Input() value: string | null = null;
  @Input() min: string | null = null;
  @Input() max: string | null = null;
  @Input() disabled: boolean = false;

  // -------------------------
  // Output → notify parent
  // -------------------------
  @Output() valueChange = new EventEmitter<string>();

  // internal signal
  datetime = signal<string>('');

  constructor() {
    effect(() => {
      if (this.value) {
        this.datetime.set(this.value);
      }
    });
  }

  // Format helper (optional)
  static format(): string {
    const date = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }

  onChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.datetime.set(newValue);
    this.valueChange.emit(newValue); // send up
  }

  static toISOLocal(datetimeLocal: string): string {
    // datetimeLocal = "2025-11-29T14:56"
    const date = new Date(datetimeLocal);
    return date.toISOString();
  }

  static fromISO(iso: string): string {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }


}
