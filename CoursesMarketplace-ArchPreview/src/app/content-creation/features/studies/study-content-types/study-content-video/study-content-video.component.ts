import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { VideoStudyUiComponent } from 'src/app/content-creation/ui/studies/study-types/video-study-ui/video-study-ui.component';
import { LoaderDialogUiComponent } from 'src/app/content-creation/ui/shared/loader-dialog-ui/loader-dialog-ui.component';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-study-content-video',
  standalone: true,
  imports: [
    CommonModule,
    VideoStudyUiComponent
  ],
  templateUrl: './study-content-video.component.html',
  styleUrl: './study-content-video.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyContentVideoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private studiesService:StudiesService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef) {}

  @Input() study:any

  @Output() updateStudy = new EventEmitter<boolean>()

  ngOnInit(): void {
    if(this.study.id_content!=null){
      this.studiesService.GetVideoContent(this.study.id_content).subscribe((response)=>{
        this.contentFromDB=response;
        this.cdr.detectChanges()
      })
    }
  }

  id: number = this.GetId();
  private sub: any;
  contentFromDB:any;
  response:any

  GetId() { // получение айди
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id']
    });
    return this.id
  }

  async SaveContent(files: FileList){
    const video = new FormData()
    if(files[0]!=null) { //если файл был загружен пользователем
      const loader = this.dialog.open(LoaderDialogUiComponent,{panelClass: 'border-container'})
      const file: File = files[0];
      video.append('video', file,this.id! + '*' + file.name)
      const data = this.studiesService.VideoUpload(video) //грузим видео
      const res = await lastValueFrom(data)
      this.response=res
        if(this.study.id_content!=null) { //если в этом занятии уже есть видео
            const data = this.studiesService.UpdateVideoContent(this.study.id_content,this.response.data.id) // обновляем сущность видео
            const response = await lastValueFrom(data)
            this.updateStudy.emit(true)
            console.log('updated');
        } else { // если видео в занятие грузится впервые
          const data = this.studiesService.NewVideoStudy(this.response.data.id) // создаем сущность видео
          const videoobject = await lastValueFrom(data)
          console.log(videoobject)
          const update = this.studiesService.UpdateStudyIdContent(this.id!,videoobject.id) // обновляем сущность занятие
          const updateResponse = await lastValueFrom(update)
          this.updateStudy.emit(true)
          console.log('created and updated');
        }
      loader.close()
    } else {
      //const dialogRef = this.dialog.open(NoFileErrorUiComponent,{panelClass: 'border-container'}) // попап что нету файла
    }
  }

}
