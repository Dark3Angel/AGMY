import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { CoursesStudiesNavbarUiComponent } from 'src/app/content-creation/ui/shared/courses-studies-navbar-ui/courses-studies-navbar-ui.component';
import { StudiesCreationUiComponent } from 'src/app/content-creation/ui/studies/studies-creation-ui/studies-creation-ui.component';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/interfaces/user.interfaces';


@Component({
  selector: 'app-studies-creation',
  standalone: true,
  imports: [
    CommonModule,
    StudiesCreationUiComponent,
    CoursesStudiesNavbarUiComponent
  ],
  templateUrl: './studies-creation.component.html',
  styleUrl: './studies-creation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesCreationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private studiesService: StudiesService,
    private cdr:ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.userService.UserData(this.mail).subscribe((Response: User) => {
      this.user = Response; // UserDto текущего пользователя
      this.getStudies(this.user.id);
    });
  }

  user: User | undefined;
  currentUser = this.authService.currentUserValue;
  mail = this.currentUser.mail; // почта текущего пользователя
  studies: any = [];

  getStudies(id: number) { // список занятий
    this.studiesService.ReturnStudies(id).subscribe((data) => {
      this.studies = data;
      this.cdr.detectChanges()
    })
  }

  createStudy(name:string) { //  создание занятия
    this.studiesService.NewStudy(name,this.user!.id).subscribe(data => this.getStudies(this.user!.id));
  }

  async deleteStudy(id:number){
    this.studiesService.DeleteStudy(id).subscribe(data => this.getStudies(this.user!.id));
  }

}
