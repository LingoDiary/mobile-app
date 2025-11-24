import {Component} from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Navigation} from "@app/components/ui/navigation/navigation";
import {FontAwesomeModule, IconDefinition} from '@fortawesome/angular-fontawesome';
import {faPencil, faLock, faUserTie, faLanguage, faArrowUpWideShort, faMoneyBill, faBell, faHeadset} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    Content,
    Navigation,
    FontAwesomeModule,
    RouterLink
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  faPencil: IconDefinition = faPencil;
  faLock: IconDefinition = faLock;
  faUserTie: IconDefinition = faUserTie;
  faLanguage: IconDefinition = faLanguage;
  faArrowUpWideShort: IconDefinition = faArrowUpWideShort;
  faMoneyBill: IconDefinition = faMoneyBill;
  faBell: IconDefinition = faBell;
  faHeadset: IconDefinition = faHeadset;
}
