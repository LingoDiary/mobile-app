import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {languageLevels} from '@app/data/language-levels';
import {LanguageLevel} from '@app/data/interfaces/LanguageLevel';

@Component({
  selector: 'app-language-levels',
  standalone: true,
  templateUrl: './language-levels.html',
  styleUrl: './language-levels.scss',
})
export class LanguageLevels implements OnInit {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  languageLevels: Array<LanguageLevel> = [];

  ngOnInit(): void {
    this.languageLevels = languageLevels;
  }

  selectedId = signal<number | null>(null);

  set(id: number): void {
    this.selectedId.set(id);
    this.validChange.emit(true);
    this.stateChange.emit({
      key: 'language_level_id',
      value: id,
    });
  }

}
