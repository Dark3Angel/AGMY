import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-courses-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './student-courses-ui.component.html',
  styleUrl: './student-courses-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCoursesUiComponent implements OnInit { 
  ngOnInit(): void {}

  @Input() courses:any

}
