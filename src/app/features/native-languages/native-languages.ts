import {Component, OnInit, signal} from '@angular/core';
import {nativeLanguages} from '@app/data/native-languages';
import {NativeLanguage} from '@app/data/interfaces/NativeLanguage';

@Component({
  selector: 'app-native-languages',
  imports: [],
  templateUrl: './native-languages.html',
  styleUrl: './native-languages.scss',
})
export class NativeLanguages implements OnInit {

  nativeLanguages: Array<NativeLanguage> = [];

  ngOnInit(): void {
    this.nativeLanguages = nativeLanguages;
  }

  selectedNativeLanguageId = signal<number | null>(null);

  setNativeLanguage(id: number): void {
    this.selectedNativeLanguageId.set(id);
    // если нужно, можно прописать в FormControl или в storage
    // this.form.patchValue({ native_language_id: id });
  }

}
