import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
  signal
} from '@angular/core';

@Component({
  selector: 'app-passcode',
  standalone: true,
  templateUrl: './passcode.html',
  styleUrl: './passcode.scss',
})
export class Passcode {
  @Output() changed = new EventEmitter<string>();
  @Output() completed = new EventEmitter<string>();

  pinLength = 4;
  items = Array(this.pinLength).fill(0);

  values = signal<string[]>(Array(this.pinLength).fill(''));

  @ViewChildren('pin') inputs!: QueryList<ElementRef>;

  handleInput(event: any, index: number) {
    const value = event.target.value.replace(/\D/g, '').slice(0, 1);

    const arr = [...this.values()];
    arr[index] = value;
    this.values.set(arr);

    this.changed.emit(arr.join(''));

    if (value && index < this.pinLength - 1) {
      this.focus(index + 1);
    }

    if (arr.every(v => v !== '')) {
      this.completed.emit(arr.join(''));
    }
  }

  handleKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.values()[index] && index > 0) {
      this.focus(index - 1);
    }
  }

  handlePaste(event: ClipboardEvent) {
    event.preventDefault();
    const text = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '');

    const arr = Array(this.pinLength).fill('');
    for (let i = 0; i < this.pinLength; i++) {
      arr[i] = text[i] ?? '';
    }
    this.values.set(arr);

    this.changed.emit(arr.join(''));

    if (arr.every(v => v !== '')) {
      this.completed.emit(arr.join(''));
    }

    const focusIndex = Math.min(text.length, this.pinLength - 1);
    if (focusIndex >= 0) this.focus(focusIndex);
  }

  focus(i: number) {
    setTimeout(() => {
      const el = this.inputs.get(i)?.nativeElement;
      el?.focus();
    });
  }

  clear() {
    this.values.set(Array(this.pinLength).fill(''));
    this.focus(0);
  }
}
