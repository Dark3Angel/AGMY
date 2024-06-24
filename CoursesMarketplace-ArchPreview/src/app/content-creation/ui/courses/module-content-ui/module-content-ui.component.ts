import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-module-content-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './module-content-ui.component.html',
  styleUrl: './module-content-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleContentUiComponent { 

  @Input() studies:any

  @Output() addStudyOpen = new EventEmitter()

  addStudy(){
    this.addStudyOpen.emit()
  }

}
