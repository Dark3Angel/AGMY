import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studies-creation-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    FormsModule
  ],
  templateUrl: './studies-creation-ui.component.html',
  styleUrl: './studies-creation-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesCreationUiComponent {

  name:string | undefined = ''

  @Input() studies:any

  @Output() newStudy = new EventEmitter<string>()

  @Output() deleteStudy = new EventEmitter<number>()

  createStudy(){
    this.newStudy.emit(this.name)
  }

  removeStudy(id:number){
    this.deleteStudy.emit(id)
  }
}
