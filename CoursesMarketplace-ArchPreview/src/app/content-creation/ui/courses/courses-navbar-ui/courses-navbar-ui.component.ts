import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CoursesService } from 'src/app/content-creation/data-access/courses/courses.service';

@Component({
  selector: 'app-courses-navbar-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule
  ],
  templateUrl: './courses-navbar-ui.component.html',
  styleUrl: './courses-navbar-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesNavbarUiComponent {
  constructor( private route: ActivatedRoute, private coursesService:CoursesService)
  {
    this.sub = this.route.params.subscribe((params) => {
    this.id = +params['id'];
  });
  this.name = localStorage.getItem('courseName')!; // имя курса из локальной перменной
  }

  @Output() publish = new EventEmitter<number>()

  id: number | undefined;
  private sub: any;

  name:string

  publishCourse(){
    this.coursesService.publishCourse(this.id!).subscribe()
  }

}
