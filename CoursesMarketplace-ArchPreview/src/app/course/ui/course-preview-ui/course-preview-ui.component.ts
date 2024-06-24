import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import EditorJS from "@editorjs/editorjs";
import { BehaviorSubject } from 'rxjs';
import { AboutReadOnlyEditorConfig } from 'src/app/utils/configs/editor-configs/about/about-readonly-config';

interface Signing{
  courseid:number,
  userid:number
}

@Component({
  selector: 'app-course-preview-ui',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './course-preview-ui.component.html',
  styleUrl: './course-preview-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursePreviewUiComponent implements OnChanges, OnInit {
  constructor( private router: Router ) {}

  @Input() plan: any
  @Input() signed: BehaviorSubject<boolean> | undefined

  @Output() sign = new EventEmitter<boolean>()

  learnlist? = []
  reqlist? = []
  editor: any;
  path: string = 'http://localhost:3000/courses/images'

  ngOnInit(): void {
    this.editor = new EditorJS(AboutReadOnlyEditorConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['plan'].currentValue != undefined) {
      this.learnlist = this.plan.coursedesc.learn.split('\n')
      this.reqlist = this.plan.coursedesc.req.split('\n')
      this.editor.isReady
        .then(() => {
          // Fill Editor with blocks data in json
          this.LoadData();
        })
    }
  }

  LoadData() { // парсинг едитора в хтмл
    var JsonContent = JSON.parse(this.plan.coursedesc.about);
    this.editor.blocks.render(JsonContent);
  }

  toCourse(){
    const path = [];
    path.push('/course',this.plan.id,'syllabus','study',this.plan.module[0].study[0].id);
    this.router.navigate(path)
  }

  signUser(){
    this.sign.emit(true)
  }

}
