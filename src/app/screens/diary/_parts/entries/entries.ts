import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {DiaryGroup} from '@core/type/diary-group';
import {formatTime} from '@shared/utils/helpers';

@Component({
  selector: 'app-entries',
  imports: [RouterLink],
  templateUrl: './entries.html',
  styleUrl: './entries.scss',
})
export class Entries {
  @Input({ required: true }) items!: DiaryGroup[];
  protected readonly formatTime = formatTime;
}
