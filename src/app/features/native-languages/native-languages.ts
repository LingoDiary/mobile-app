import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {nativeLanguages} from '@app/data/native-languages';
import {NativeLanguage} from '@app/data/interfaces/NativeLanguage';

@Component({
  selector: 'app-native-languages',
  standalone: true,
  templateUrl: './native-languages.html',
  styleUrl: './native-languages.scss',
})
export class NativeLanguages implements OnInit {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  nativeLanguages: Array<NativeLanguage> = [];

  ngOnInit(): void {
    this.nativeLanguages = nativeLanguages;
  }

  selectedNativeLanguageId = signal<number | null>(null);

  setNativeLanguage(id: number): void {
    this.selectedNativeLanguageId.set(id);
    this.validChange.emit(true);
    this.stateChange.emit({
      key: 'native_language_id',
      value: id,
    });
  }

}
