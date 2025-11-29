import {Component, inject, Input} from '@angular/core';
import {Button} from "@app/components/ui/button/button";
import {img} from '@shared/utils/helpers';
import {Router} from '@angular/router';

@Component({
  selector: 'app-back',
    imports: [
        Button
    ],
  templateUrl: './back.html',
  styleUrl: './back.scss',
})
export class Back {
  @Input() url: string = '';

  protected readonly img = img;

  private readonly router: Router = inject<Router>(Router);

  redirect(): void {
    this.router.navigate([this.url]);
  }

}
