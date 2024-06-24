import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { ModuleContentUiComponent } from 'src/app/content-creation/ui/courses/module-content-ui/module-content-ui.component';
import { ModuleAddStudyDialogComponent } from '../module-add-study-dialog/module-add-study-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-module-content',
  standalone: true,
  imports: [
    CommonModule,
    ModuleContentUiComponent,
    ReactiveFormsModule,
    MatDialogModule
  ],
  templateUrl: './module-content.component.html',
  styleUrl: './module-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleContentComponent {
  constructor(
    private studyService: StudiesService,
    private route: ActivatedRoute,
    private cdr:ChangeDetectorRef,
    public dialog: MatDialog) 
    {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getStudies(this.id);
    });
  }


  id: number | undefined;
  private sub: any;
  studies:any= [] // список занятий модуля

  getStudies(id: number) { //получения списка занятий модуля
    this.studyService.StudyListByModule(id).subscribe((data) => {
      this.studies = data;
      this.cdr.detectChanges()
    })
  }

  addStudy(){
    const dialogRef = this.dialog.open(ModuleAddStudyDialogComponent,
      {
        data:{
          route:this.route
        }
      }
      );
    dialogRef.afterClosed().subscribe(result => {
      this.getStudies(this.id!);
    });
  }

}
