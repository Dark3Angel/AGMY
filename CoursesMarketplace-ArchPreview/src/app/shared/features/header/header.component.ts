import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../data-access/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../../data-access/user/user.service';
import { lastValueFrom } from 'rxjs';
import { HeaderUiComponent } from '../../ui/header-ui/header-ui.component';

export interface TagsModel {
  primarytag?: string
  secondarytag?: string
}

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    standalone: true,
    imports: [HeaderUiComponent, RouterOutlet]
})
export class HeaderComponent implements OnInit {
  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private userService: UserService) { }

  async ngOnInit() {
    this.loggedIn = !!this.authService.currentUserValue;
    await this.UserData()
  }

  public loggedIn = false;
  uri: string | undefined
  currentUser?= this.authService.currentUserValue;
  user: any

  async UserData() {
    if (this.currentUser != null) {
      const mail = this.currentUser.mail;
      const data = this.userService.UserData(mail)
      const response = await lastValueFrom(data)
      this.user = response
    }
  }

  LogOut(flag: boolean) {
    if (flag == true) {
      if (this.router.url == '/') {
        this.authService.logout();
        window.location.reload();
      }
      else {
        this.authService.logout();
        this.router.navigate(['/']).then(()=> window.location.reload())
      }
    }
  }

  openLog(flag: boolean) {
    if (flag == true) {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  async searchButton(query: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['catalog/search/find'], { queryParams: { text: query } })
    })
  }

  async tagsButton(tags: TagsModel) {
    if (tags.secondarytag == null) {
      this.uri = 'catalog/' + tags.primarytag
    } else {
      this.uri = 'catalog/' + tags.primarytag + '/' + tags.secondarytag
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([this.uri]));
  }
}
