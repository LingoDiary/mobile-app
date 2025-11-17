import {Component, signal} from '@angular/core';
import {img} from '@app/shared/utils/helpers';
import {Content} from '@app/components/content/content';
import {Button} from '@app/components/ui/button/button';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    Content,
    Button
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding {

  protected readonly img = img;

  step = signal<number>(0);
  totalSteps: number = 6;

  previous() {
    this.step.update(value => value - 1);
  }

  next() {
    this.step.update(value => value + 1);
  }


}
