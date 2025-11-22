import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    FontAwesomeModule,
    RouterLinkActive,
  ],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  protected readonly img = img;
}
