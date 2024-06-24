import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CoursePreviewUiComponent } from '../../ui/course-preview-ui/course-preview-ui.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../data-access/course.service';
import { BehaviorSubject, Observable, lastValueFrom, of } from 'rxjs';
import { UserCoursesService } from 'src/app/user-courses/data-access/user-courses.service';
import { UserService } from 'src/app/shared/data-access/user/user.service';

interface Signing{
  courseid:number,
  userid:number
}

@Component({
  selector: 'app-course-preview',
  standalone: true,
  imports: [
    CommonModule,
    CoursePreviewUiComponent
  ],
  templateUrl: './course-preview.component.html',
  styleUrl: './course-preview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePreviewComponent implements OnInit {
  constructor(private route: ActivatedRoute, private courseService: CourseService, private cdr: ChangeDetectorRef, private userCoursesServce:UserCoursesService, private userService:UserService) {
    this.route.params.subscribe((params) => {
      this.translit = params['translit'];
    });
    this.signed = new BehaviorSubject<boolean>(false)
  }

  async ngOnInit() {
    await this.getid(this.translit!)
    await this.CoursePlan(this.id!)
    const courses = await lastValueFrom(this.userCoursesServce.userCourses())
    if(courses.courses.some((val:any)=>val.id == this.id)) {
      this.signed.next(true)
    }
  }

  translit: string | undefined;
  plan: any;
  id:number | undefined
  signed:BehaviorSubject<boolean>

  async CoursePlan(id: number) { // получение информации о курсе и модулях
    this.courseService.ModuleListByCourseID(id).subscribe((data) => {
      this.plan = data[0];
      this.cdr.detectChanges()
    })
  }

  async getid(translit: string) {
    const data = this.courseService.FindCourseByTranslit(translit)
    const response = await lastValueFrom(data)
    this.id = response.id
  }

  async signUser(flag:boolean){
    const userid = (await lastValueFrom(this.userService.UserData(this.userService.currentUserMail!))).id
    const sign: Signing = {
      userid: userid,
      courseid: this.id!
    }
    const data = this.courseService.SignUserToCourse(sign)
    const response = await lastValueFrom(data)
    this.signed.next(true)
  }

}
