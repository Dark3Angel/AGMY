import { DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/content-creation/data-access/courses/courses.service';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { ModuleAddStudyDialogUiComponent } from 'src/app/content-creation/ui/courses/module-add-study-dialog-ui/module-add-study-dialog-ui.component';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { UserService } from 'src/app/shared/data-access/user/user.service';
import { User } from 'src/app/shared/interfaces/user.interfaces';


@Component({
  selector: 'app-module-add-study-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ModuleAddStudyDialogUiComponent
  ],
  templateUrl: './module-add-study-dialog.component.html',
  styleUrl: './module-add-study-dialog.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleAddStudyDialogComponent implements OnInit { 
  constructor(
    @Inject(DIALOG_DATA) data:{route:ActivatedRoute},
    private studyService:StudiesService,
    private userService:UserService,
    private authService:AuthService,
    private coursesService:CoursesService,
    private cdr:ChangeDetectorRef,
    public dialogRef: MatDialogRef<ModuleAddStudyDialogComponent>,
    ) 
  {
    data.route.params.subscribe(params => {this.id = +params['id']});
    this.getAllUserStudies();
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('auto','45dvw')
  }

  studies:any=[]
  id:number | undefined;
  user:User | undefined;
  currentUser = this.authService.currentUserValue;
  mail = this.currentUser.mail; // почта текущего пользователя

  getAllUserStudies() { //получение всех занятий созданных пользователем
    this.userService.UserData(this.mail).subscribe((Response:User)=> {
      this.user=Response; // UserDto текущего пользователя
      this.studyService.ReturnStudies(this.user.id).subscribe((data) => 
      {
        this.studies = data;
        this.cdr.detectChanges()
      })
    })
  }

  addStudy(idstudy:number) { //добавление занятия в модуль
    this.coursesService.FindModule(this.id!).subscribe((data)=> {
      const module=data;
      this.studyService.UpdateCourseAndModule(idstudy,module.course.id,this.id!).subscribe(data => 
        {
          this.dialogRef.close()
        });
    })
  }

}
