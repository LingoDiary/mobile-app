import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  QueryList,
  ViewChildren,
  signal, OnInit
} from '@angular/core';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.html',
  styleUrl: './passcode.scss',
})
export class Passcode implements OnInit {
  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  pinLength: number = 4;
  items = Array(this.pinLength).fill(0);
  values = signal<string[]>(Array(this.pinLength).fill(''));

  @ViewChildren('pin') inputs!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.validChange.emit(true);
  }

  get isComplete(): boolean {
    return this.values().every(v => v !== '');
  }

  handleInput(event: any, index: number) {
    const value = event.target.value.replace(/\D/g, '').slice(0, 1);

    const arr = [...this.values()];
    arr[index] = value;
    this.values.set(arr);

    if (value && index < this.pinLength - 1) {
      this.focus(index + 1);
    }

    this.emitState();
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

    const focusIndex = Math.min(text.length, this.pinLength - 1);
    this.focus(focusIndex);

    this.emitState();
  }

  emitState() {
    const code = this.values().join('');

    if (this.isComplete) {
      this.validChange.emit(true);
      this.stateChange.emit({ key: 'passcode', value: code });

      return;
    }

    if (!code.length) {
      this.validChange.emit(true);
      this.stateChange.emit({ key: 'passcode', value: null });
      return;
    }

    this.validChange.emit(false);
  }

  focus(i: number) {
    setTimeout(() => {
      const el = this.inputs.get(i)?.nativeElement;
      el?.focus();
    });
  }

  clear() {
    this.values.set(Array(this.pinLength).fill(''));
  }
}
