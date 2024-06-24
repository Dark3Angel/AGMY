import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-module-add-study-dialog-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './module-add-study-dialog-ui.component.html',
  styleUrl: './module-add-study-dialog-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleAddStudyDialogUiComponent { 

  @Input() studies:any

  @Output() studytoModule = new EventEmitter<number>()


  addStudy(id:number){
    this.studytoModule.emit(id)
  }

}
