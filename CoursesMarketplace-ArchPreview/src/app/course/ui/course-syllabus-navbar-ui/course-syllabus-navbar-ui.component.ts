import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-syllabus-navbar-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './course-syllabus-navbar-ui.component.html',
  styleUrl: './course-syllabus-navbar-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseSyllabusNavbarUiComponent { 

  @Input() plan:any
}
