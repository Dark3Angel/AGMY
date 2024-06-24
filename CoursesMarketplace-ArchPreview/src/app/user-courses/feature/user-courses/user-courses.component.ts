import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UserCoursesService } from '../../data-access/user-courses.service';
import { Observable } from 'rxjs';
import { StudentCoursesUiComponent } from '../../ui/student-courses/student-courses-ui.component';
import { TeacherCoursesUiComponent } from '../../ui/teacher-courses/teacher-courses-ui.component';

interface coursesTemplate{
  type:string,
  courses:any
}

@Component({
  selector: 'app-user-courses',
  standalone: true,
  imports: [
    CommonModule,
    StudentCoursesUiComponent,
    TeacherCoursesUiComponent
  ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCoursesComponent implements OnInit {
  constructor(private userCoursesService:UserCoursesService){}

  // TODO inspect issue
  // private userCoursesService: UserCoursesService = Inject(UserCoursesService)
  // for some reason Inject() refuses to work

  courses$:Observable<coursesTemplate> | undefined

  ngOnInit(): void {
    this.courses$ = this.userCoursesService.userCourses()
  }
}
