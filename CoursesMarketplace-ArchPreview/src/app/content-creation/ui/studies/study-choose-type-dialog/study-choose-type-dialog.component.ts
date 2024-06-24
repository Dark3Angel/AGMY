import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';

@Component({
  selector: 'app-study-choose-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './study-choose-type-dialog.component.html',
  styleUrl: './study-choose-type-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyChooseTypeDialogComponent { 
  constructor(
    @Inject(DIALOG_DATA) data:{route:ActivatedRoute},
    private studiesService:StudiesService,
    private dialogRef: DialogRef<StudyChooseTypeDialogComponent>
    ) {
    data.route.params.subscribe(params => {this.id = +params['id']});
  }

  id: number | undefined;
  text:number = 1;
  video:number = 2;

  updateTypeContent(type_content:number) {
    this.studiesService.UpdateStudyTypeContent(this.id!,type_content).subscribe(response => console.log(response));
    this.dialogRef.close();
  }
}
