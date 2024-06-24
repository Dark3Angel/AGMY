import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teacher-courses-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './teacher-courses-ui.component.html',
  styleUrl: './teacher-courses-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCoursesUiComponent implements OnInit {

  panelOpenState = false;

  ngOnInit(): void {
    console.log(this.courses)
  }

  @Input() courses:any

  AddCourseNameToNav(name:string) { // название курса в локальную переменную (это делается для того, чтобы убрать микро-подгрузку названия курса в навбар)
    localStorage.setItem('courseName',name); 
  }
}
