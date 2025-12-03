import {Component} from '@angular/core';
import {Navigation} from "@app/components/ui/navigation/navigation";
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faPencil, faLock, faUserTie, faLanguage, faArrowUpWideShort, faMoneyBill, faBell, faHeadset} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-profile-screen',
  imports: [
    Navigation,
    FontAwesomeModule,
    RouterLink,
    Viewport
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class ProfileScreen {
  faPencil: IconDefinition = faPencil;
  faLock: IconDefinition = faLock;
  faUserTie: IconDefinition = faUserTie;
  faLanguage: IconDefinition = faLanguage;
  faArrowUpWideShort: IconDefinition = faArrowUpWideShort;
  faMoneyBill: IconDefinition = faMoneyBill;
  faBell: IconDefinition = faBell;
  faHeadset: IconDefinition = faHeadset;
}
