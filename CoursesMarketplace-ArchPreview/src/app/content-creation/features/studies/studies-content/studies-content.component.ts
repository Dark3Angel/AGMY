import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { StudiesContentUiComponent } from 'src/app/content-creation/ui/studies/studies-content-ui/studies-content-ui.component';
import { StudyChooseTypeDialogComponent } from 'src/app/content-creation/ui/studies/study-choose-type-dialog/study-choose-type-dialog.component';

@Component({
  selector: 'app-studies-content',
  standalone: true,
  imports: [
    CommonModule,
    StudiesContentUiComponent
  ],
  templateUrl: './studies-content.component.html',
  styleUrl: './studies-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudiesContentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private studiesService: StudiesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getStudy()
    });
  }

  id: number | undefined;
  private sub: any;
  study: any | undefined;

  getStudy() {
    this.studiesService.ReturnStudy(this.id!).subscribe((data) => {
      this.study = data
      this.cdr.detectChanges()
    }
    )
  }

  updateStudy(flag: boolean) {
    if (flag == true) {
      this.getStudy()
    }
  }

  chooseType(flag: boolean) {
    if (flag == true) {
      const dialogRef = this.dialog.open(StudyChooseTypeDialogComponent,
        {
          data: {
            route: this.route
          }
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.studiesService.ReturnStudy(this.id).subscribe(data => this.study = data)
        });
        console.log(`Dialog result: ${result}`);
        window.location.reload();
      });
    }
  }
}
