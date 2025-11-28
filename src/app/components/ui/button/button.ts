import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {

  @Input() type: 'default' | 'outline' | 'link' = 'default';
  @Input() extraClass: string = '';
  @Input() disabled: boolean = false;


}
