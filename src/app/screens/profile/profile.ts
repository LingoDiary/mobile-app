import { Component } from '@angular/core';
import {Content} from "@app/components/core/content/content";
import {Navigation} from "@app/components/ui/navigation/navigation";

@Component({
  selector: 'app-profile',
    imports: [
        Content,
        Navigation
    ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

}
