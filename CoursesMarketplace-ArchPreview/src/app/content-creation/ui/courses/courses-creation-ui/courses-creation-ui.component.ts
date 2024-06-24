import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-creation-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './courses-creation-ui.component.html',
  styleUrl: './courses-creation-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCreationUiComponent { 

  name:string = ''

  @Input() courses:any

  @Output() deleteCourse = new EventEmitter<number>()

  @Output() newCourse = new EventEmitter<string>()

  createCourse(){
    this.newCourse.emit(this.name)
  }

  AddCourseNameToNav(name:string) { // название курса в локальную переменную (это делается для того, чтобы убрать микро-подгрузку названия курса в навбар)
    localStorage.setItem('courseName',name); 
  }

  removeCourse(id:number){
    this.deleteCourse.emit(id)
  }
}
