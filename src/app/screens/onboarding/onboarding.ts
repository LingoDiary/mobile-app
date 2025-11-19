import {Component, OnInit, signal} from '@angular/core';
import {img} from '@app/shared/utils/helpers';
import {Content} from '@app/components/content/content';
import {Button} from '@app/components/ui/button/button';
import {Mentors} from '@app/features/mentors/mentors';
import {NgClass} from '@angular/common';
import {NativeLanguages} from '@app/features/native-languages/native-languages';
import {Name} from '@app/features/name/name';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    Content,
    Button,
    Mentors,
    NgClass,
    NativeLanguages,
    Name
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding implements OnInit {

  protected readonly img = img;

  step = signal<number>(0);
  stepValid = signal<boolean>(true);

  totalSteps: number = 6;
  steps: Array<{
    id: number;
    status: string
  }> = [];

  ngOnInit(): void {
    this.steps = Array.from({length: this.totalSteps}, (_, i) => ({
      id: i + 1,
      status: (this.step() >= i + 1) ? 'active' : 'inactive',
    }));
  }

  previous(): void {
    if (this.step() === 1) {
      this.step.set(0);
      this.recalcSteps();
      return;
    }

    if (this.step() > 1) {
      this.step.update(v => v - 1);
      this.recalcSteps();
    }
  }


  next(): void {
    // greeting → go to step 1
    if (this.step() === 0) {
      this.step.set(1);
      this.recalcSteps();
      return;
    }

    if (this.step() < this.totalSteps) {
      this.step.update(v => v + 1);
      this.recalcSteps();
    }
  }

  onStepValidChange(val: boolean) {
    this.stepValid.set(val);
  }

  isNextEnabled(): boolean {
    if (!this.step()) {
      return false;
    }
    return !this.stepValid();
  }

  private recalcSteps(): void {
    this.steps = this.steps.map(step => ({
      ...step,
      status: (this.step() >= step.id) ? 'active' : 'inactive'
    }));

  }

}
