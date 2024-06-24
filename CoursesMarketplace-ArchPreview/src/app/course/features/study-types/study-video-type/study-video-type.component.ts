import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CourseService } from 'src/app/course/data-access/course.service';
import { StudyVideoTypeUiComponent } from 'src/app/course/ui/study-types-ui/study-video-type-ui/study-video-type-ui.component';

@Component({
  selector: 'app-study-video-type',
  standalone: true,
  imports: [
    CommonModule,
    StudyVideoTypeUiComponent
  ],
  templateUrl: './study-video-type.component.html',
  styleUrl: './study-video-type.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyVideoTypeComponent implements OnInit, OnChanges {
  constructor(private courseService: CourseService, private cdr: ChangeDetectorRef) { }

  @Input() study: any

  path: string | undefined

  ngOnInit(): void {
    this.getVideoStudy()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['study'].currentValue != changes['study'].previousValue && changes['study'].previousValue!= undefined){
      this.getVideoStudy()
    }
  }

  getVideoStudy() {
    if (this.study.type_content == 2) {
      this.courseService.ReturnStudybyType(this.study.id_content, this.study.type_content).subscribe((response) => {
        this.path = response.video_link
        this.cdr.detectChanges()
      })
    } else {
      //вывести ошибку
    }
  }
}