import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  name = new FormControl('');

  constructor() {
    this.name.valueChanges.subscribe(value => {
      const isValid = !!value && value.trim().length >= 2;

      this.validChange.emit(isValid);
      this.stateChange.emit({
        key: 'name',
        value: value ?? ''
      });
    });
  }
}
