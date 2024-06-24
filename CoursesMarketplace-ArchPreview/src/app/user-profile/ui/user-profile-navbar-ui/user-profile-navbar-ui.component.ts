import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-user-profile-navbar-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './user-profile-navbar-ui.component.html',
  styleUrl: './user-profile-navbar-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileNavbarUiComponent { }
