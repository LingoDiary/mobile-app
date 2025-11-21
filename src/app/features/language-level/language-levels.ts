import {Component, OnInit, signal} from '@angular/core';
import {languageLevels} from '@app/data/language-levels';
import {LanguageLevel} from '@app/data/interfaces/LanguageLevel';

@Component({
  selector: 'app-language-levels',
  standalone: true,
  templateUrl: './language-levels.html',
  styleUrl: './language-levels.scss',
})
export class LanguageLevels implements OnInit {
  languageLevels: Array<LanguageLevel> = [];

  ngOnInit(): void {
    this.languageLevels = languageLevels;
  }

  selectedId = signal<number | null>(null);

  set(id: number): void {
    this.selectedId.set(id);
    // если нужно, можно прописать в FormControl или в storage
    // this.form.patchValue({ native_language_id: id });
  }

}
