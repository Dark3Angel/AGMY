import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-profile-pass-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-profile-pass-ui.component.html',
  styleUrl: './user-profile-pass-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePassUiComponent { }
