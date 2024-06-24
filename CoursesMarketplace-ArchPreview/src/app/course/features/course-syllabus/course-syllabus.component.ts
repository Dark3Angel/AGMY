import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StudyTextTypeComponent } from '../study-types/study-text-type/study-text-type.component';
import { StudyVideoTypeComponent } from '../study-types/study-video-type/study-video-type.component';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../data-access/course.service';
import { CourseSyllabusNavbarUiComponent } from '../../ui/course-syllabus-navbar-ui/course-syllabus-navbar-ui.component';

@Component({
  selector: 'app-course-syllabus',
  standalone: true,
  imports: [
    CommonModule,
    StudyTextTypeComponent,
    StudyVideoTypeComponent,
    CourseSyllabusNavbarUiComponent
  ],
  templateUrl: './course-syllabus.component.html',
  styleUrl: './course-syllabus.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSyllabusComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private courseService: CourseService, private cdr: ChangeDetectorRef) {
    this.sub = this.route.params.subscribe(params => {
      this.sid = +params['sid'];
      this.cid = +params['cid'];
      this.CurrentStudy(this.sid!)
    });
  }
  ngOnInit(): void {
    this.CoursePlan(this.cid!)
  }

  CoursePlan(id: number) { // получение информации о курсе и модулях
    this.courseService.ModuleListByCourseID(id).subscribe(data => { this.plan = data[0]; this.cdr.detectChanges() })
  }

  CurrentStudy(id: number) {  //текущее выбранное занятие
    this.courseService.ReturnStudy(id).subscribe(data => { this.study = data; this.cdr.detectChanges() })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cid: number | undefined;
  sid: number | undefined;
  private sub: any;
  study: any | undefined;
  plan: any;

}
