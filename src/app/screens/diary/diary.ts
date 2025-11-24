import { Component } from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Button} from '@app/components/ui/button/button';
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-diary-screen',
  imports: [
    Content,
    Navigation,
    Button
  ],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class DiaryScreen {

  protected readonly img = img;
}
