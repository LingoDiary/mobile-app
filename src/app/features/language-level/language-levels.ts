import {Component, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges} from '@angular/core';
import {languageLevels} from '@core/data/language-levels';
import {LanguageLevel} from '@core/data/interfaces/LanguageLevel';

@Component({
  selector: 'app-language-levels',
  standalone: true,
  templateUrl: './language-levels.html',
  styleUrl: './language-levels.scss',
})
export class LanguageLevels implements OnInit, OnChanges {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  @Input() inputValue: number | null = null;

  languageLevels: Array<LanguageLevel> = [];

  ngOnInit(): void {
    this.languageLevels = languageLevels;
  }

  ngOnChanges() {
    if (this.inputValue) this.set(this.inputValue);
  }

  selectedId = signal<number | null>(null);

  set(id: number): void {
    this.selectedId.set(id);
    this.validChange.emit(true);
    this.stateChange.emit({
      key: 'languageLevelId',
      value: id,
    });
  }

}
