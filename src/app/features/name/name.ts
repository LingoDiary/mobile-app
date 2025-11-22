import {Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name implements OnInit, OnChanges {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  @Input() value: string | null = null;

  name = new FormControl('');

  ngOnInit() {
    this.name.valueChanges.subscribe(value => {
      const isValid = !!value && value.trim().length >= 2;

      this.validChange.emit(isValid);
      this.stateChange.emit({
        key: 'name',
        value: value ?? ''
      });
    });

    const initialValue = this.name.value;
    const initialValid = !!initialValue && initialValue.trim().length >= 2;

    this.validChange.emit(initialValid);
    this.stateChange.emit({
      key: 'name',
      value: initialValue ?? ''
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.value) {
      this.name.setValue(this.value, { emitEvent: false });
    }
  }
}
