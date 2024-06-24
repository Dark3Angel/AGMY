import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/content-creation/data-access/courses/courses.service';
import { CoursesCreationUiComponent } from 'src/app/content-creation/ui/courses/courses-creation-ui/courses-creation-ui.component';
import { CoursesStudiesNavbarUiComponent } from 'src/app/content-creation/ui/shared/courses-studies-navbar-ui/courses-studies-navbar-ui.component';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/interfaces/user.interfaces';

@Component({
  selector: 'app-courses-creation',
  standalone: true,
  imports: [
    CommonModule,
    CoursesStudiesNavbarUiComponent,
    CoursesCreationUiComponent
  ],
  templateUrl: './courses-creation.component.html',
  styleUrl: './courses-creation.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCreationComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private courseService: CoursesService,
    private cdr:ChangeDetectorRef
    ) {}

  ngOnInit(): void {
    this.userService.UserData(this.mail).subscribe((Response: User) => {
      this.user = Response; // UserDto текущего пользователя
      this.getCourses(this.user.id); // загрузка списка курсов
    });
  }

  user: User | undefined;
  currentUser = this.authService.currentUserValue;
  mail = this.currentUser.mail; // почта текущего пользователя
  courses: any = [];

  getCourses(id:number) { // получение списка курсов
    this.courseService.CourseList(id).subscribe((data) => {
    this.courses = data;
    this.cdr.detectChanges()
    })
  }

  createCourse(name:string) { // создание курса
    this.courseService.NewCourse(name,this.user!.id).subscribe((data) =>
    this.getCourses(this.user!.id));
  }

  deleteCourse(deleteid:number) { //удаление курса
    this.courseService.DeleteCourse(deleteid).subscribe((data) => 
    this.getCourses(this.user!.id));
  }

}
