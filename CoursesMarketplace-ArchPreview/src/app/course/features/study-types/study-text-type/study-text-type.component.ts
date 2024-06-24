import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CourseService } from 'src/app/course/data-access/course.service';
import { StudyTextTypeUiComponent } from 'src/app/course/ui/study-types-ui/study-text-type-ui/study-text-type-ui.component';

@Component({
  selector: 'app-study-text-type',
  standalone: true,
  imports: [
    CommonModule,
    StudyTextTypeUiComponent
  ],
  templateUrl: './study-text-type.component.html',
  styleUrl: './study-text-type.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyTextTypeComponent implements OnInit, OnChanges {
  constructor(private courseService:CourseService,private cdr:ChangeDetectorRef){}

  @Input() study:any
  
  ngOnInit(): void {
    this.getTextStudy()
  }

  textStudy:any

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['study'].currentValue != changes['study'].previousValue && changes['study'].previousValue!= undefined){
      this.getTextStudy()
    }
  }

  getTextStudy(){
    if(this.study.type_content==1){
      this.courseService.ReturnStudybyType(this.study.id_content,this.study.type_content).subscribe((data) => {
        this.textStudy = data.content;
        this.cdr.detectChanges()
      })
    } else {
      //вывести ошибку
    }
  }

}