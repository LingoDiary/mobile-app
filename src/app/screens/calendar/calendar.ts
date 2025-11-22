import { Component } from '@angular/core';
import {Button} from "@app/components/ui/button/button";
import {Content} from "@app/components/core/content/content";
import {Navigation} from "@app/components/ui/navigation/navigation";
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-calendar',
    imports: [
        Button,
        Content,
        Navigation
    ],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class Calendar {

  protected readonly img = img;
}
