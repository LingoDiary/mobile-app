import { Component } from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Navigation} from "@app/components/ui/navigation/navigation";
import {img} from '@app/shared/utils/helpers';
import {DiaryScreen} from '@app/screens/diary/diary';

@Component({
  selector: 'app-calendar-screen',
    imports: [
        Content,
        Navigation
    ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class CalendarScreen {

  protected readonly img = img;
}
