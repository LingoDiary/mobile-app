import { Component } from '@angular/core';
import {Button} from "@app/components/ui/button/button";
import {Content} from "@app/components/grid/content/content";
import {Navigation} from "@app/components/ui/navigation/navigation";
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-dictionary-screen',
    imports: [
        Button,
        Content,
        Navigation
    ],
  templateUrl: './dictionary.html',
  styleUrl: './dictionary.scss',
})
export class DictionaryScreen {

  protected readonly img = img;
}
