import { Component } from '@angular/core';
import {Navigation} from "@app/components/ui/navigation/navigation";
import {img} from '@shared/utils/helpers';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-calendar-screen',
  imports: [
    Navigation,
    Viewport
  ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class CalendarScreen {

  protected readonly img = img;
}
