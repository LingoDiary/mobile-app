import { Component } from '@angular/core';
import {Content} from "@app/components/core/content/content";
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Button} from '@app/components/ui/button/button';
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-diary',
  imports: [
    Content,
    Navigation,
    Button
  ],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class Diary {

  protected readonly img = img;
}
