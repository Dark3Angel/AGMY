import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserProfileNavbarUiComponent } from '../../ui/user-profile-navbar-ui/user-profile-navbar-ui.component';
import { UserProfilePassUiComponent } from '../../ui/user-profile-pass-ui/user-profile-pass-ui.component';

@Component({
  selector: 'app-user-profile-pass',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileNavbarUiComponent,
    UserProfilePassUiComponent
  ],
  templateUrl: './user-profile-pass.component.html',
  styleUrl: './user-profile-pass.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePassComponent { }
