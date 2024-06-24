import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile-mail-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './user-profile-mail-ui.component.html',
  styleUrl: './user-profile-mail-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileMailUiComponent {
  
  @Input() mail?:string

}
