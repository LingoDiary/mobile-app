import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name {
  @Output() validChange = new EventEmitter<boolean>();

  name = new FormControl('');

  constructor() {
    this.name.valueChanges.subscribe(value => {
      const isValid = !!value && value.trim().length > 0;
      this.validChange.emit(isValid);
    });
  }

}
