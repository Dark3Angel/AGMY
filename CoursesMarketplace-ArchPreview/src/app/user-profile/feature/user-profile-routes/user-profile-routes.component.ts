import { UserProfileService } from "../../data-access/user-profile.service";
import { UserProfileEditComponent } from "../user-profile-edit/user-profile-edit.component";
import { UserProfileMailComponent } from "../user-profile-mail/user-profile-mail.component";
import { UserProfilePassComponent } from "../user-profile-pass/user-profile-pass.component";

export default [
  {
    path:'',
    providers:[UserProfileService],
    children: [
      {
        path: 'edit',
        component: UserProfileEditComponent
      },
      {
        path: 'mail',
        component: UserProfileMailComponent
      },
      {
        path: 'pass',
        component: UserProfilePassComponent
      }
    ]
  }
]