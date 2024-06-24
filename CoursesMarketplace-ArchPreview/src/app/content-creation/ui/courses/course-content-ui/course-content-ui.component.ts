import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-content-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    DragDropModule,
    FormsModule
  ],
  templateUrl: './course-content-ui.component.html',
  styleUrl: './course-content-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseContentUiComponent { 

  @Input() modules:any
  @Input() moduleorder:any

  name:string = ''

  @Output() newModule = new EventEmitter<string>()

  @Output() delete = new EventEmitter<number>()

  @Output() newOrder = new EventEmitter()


  createModule(){
    this.newModule.emit(this.name)
  }

  async drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.moduleorder, event.previousIndex, event.currentIndex);
    this.newOrder.emit()
  }

  deleteModule(id:number){
    this.delete.emit(id)
  }

}
