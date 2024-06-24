import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserProfileNavbarUiComponent } from '../../ui/user-profile-navbar-ui/user-profile-navbar-ui.component';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { UserProfileService } from '../../data-access/user-profile.service';
import { lastValueFrom } from 'rxjs';
import { UserProfileEditUiComponent } from '../../ui/user-profile-edit-ui/user-profile-edit-ui.component';
import { User } from 'src/app/shared/interfaces/user.interfaces';


@Component({
  selector: 'app-user-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    UserProfileNavbarUiComponent,
    UserProfileEditUiComponent
  ],
  templateUrl: './user-profile-edit.component.html',
  styleUrl: './user-profile-edit.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileEditComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private userProfileService: UserProfileService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    await this.userData()
  }

  async userData() {
    const mail = this.currentUser.mail;
    const data = this.userService.UserData(mail)
    const response = await lastValueFrom(data)
    this.user = response
    this.cdr.detectChanges()
  }

  user: User | undefined;
  currentUser = this.authService.currentUserValue;
  mail = this.currentUser.mail; // почта текущего пользователя

  name: string | undefined;               //
  secondname: string | undefined;         //// TODO Заменить на форму
  about: string | undefined;              //// 
  pfp_path: string | undefined;           //


  async onSaveButton(files: FileList) { // кнопка сохранения
    const image = new FormData();
    if (files[0] != null) { //если файл был загружен пользователем
      const file: File = files[0];
      image.append('image', file, this.user?.mail + "*" + file.name)
      const pfp_req = this.userProfileService.pfpLoad(image)
      const pfp_resp = await lastValueFrom(pfp_req)
      this.pfp_path = "/" + this.user?.mail + "/" + file.name.split(/[!\s#]+/).join('_');
    }

    this.name = (<HTMLInputElement>document.getElementById("NameInput")).value;
    this.secondname = (<HTMLInputElement>document.getElementById("SecondNameInput")).value;
    this.about = (<HTMLInputElement>document.getElementById("AboutInput")).value;
    this.userProfileService.UserUpdate(this.user!.id, this.name, this.secondname, this.about, this.pfp_path).subscribe();
    if (this.pfp_path) {
      window.location.reload();
    }
  }
}
