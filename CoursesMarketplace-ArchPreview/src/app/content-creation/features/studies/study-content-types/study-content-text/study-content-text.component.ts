import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { StudiesService } from 'src/app/content-creation/data-access/studies/studies.service';
import { TextStudyUiComponent } from 'src/app/content-creation/ui/studies/study-types/text-study-ui/text-study-ui.component';

@Component({
  selector: 'app-study-content-text',
  standalone: true,
  imports: [
    CommonModule,
    TextStudyUiComponent
  ],
  templateUrl: './study-content-text.component.html',
  styleUrl: './study-content-text.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyContentTextComponent implements OnInit {
  constructor(private route: ActivatedRoute, private studiesService: StudiesService, private cdr: ChangeDetectorRef) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id']
    });
  }

  @Input() study: any

  @Output() updateStudy = new EventEmitter<boolean>()

  ngOnInit(): void {
    if(this.study.id_content!=null){
      this.studiesService.GetTextContent(this.study.id_content).subscribe((data)=>{
        this.contentFromDB = data.content
        this.cdr.detectChanges()
      })
    }
  }

  async SaveContent(data:any){
    const content = JSON.stringify(data);
    console.log(this.study.id_content)
      if (this.study.id_content!=null){
        const data = this.studiesService.UpdateTextContent(this.study.id_content,content) // обновления занятия
        const response = await lastValueFrom(data)
        this.updateStudy.emit(true)
        console.log('updated');
      } else {
        const textdata = this.studiesService.NewTextStudy(content) // создание сущности текст
        const textobject = await lastValueFrom(textdata)
        const update = this.studiesService.UpdateStudyIdContent(this.id!,textobject.id) // связь сущности текст с сущностью занятие
        const response = await lastValueFrom(update)
        this.updateStudy.emit(true)
        console.log('created and updated');
      }
  }

  id: number | undefined;
  private sub: any;

  contentFromDB:any

}
