import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import EditorJS from "@editorjs/editorjs";
import { StudyTextEditorConfig } from 'src/app/utils/configs/editor-configs/study-text/study-text-config';

@Component({
  selector: 'app-text-study-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './text-study-ui.component.html',
  styleUrl: './text-study-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextStudyUiComponent implements OnChanges, OnInit {
  constructor(private route: ActivatedRoute) { }

  @Input() contentFromDB: any

  @Output() saveText = new EventEmitter<any>()

  editor: any
  id: number | undefined;
  private sub: any;

  async ngOnInit() {
    this.editor = new EditorJS(StudyTextEditorConfig(this.GetId()));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentFromDB'].currentValue != undefined){
      this.editor.isReady
      .then(() => {
          // Fill Editor with blocks data in json
          this.LoadData();
      })
    }
  }

  GetId() { // получение айди
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id']
    });
    return this.id
  }

  LoadData() { //загрузка данных в едитор
    var JsonContent = JSON.parse(this.contentFromDB);
    this.editor.blocks.render(JsonContent);
  }

  async SaveContent() {
    this.editor.save().then((outputData:any)=>{
      this.saveText.emit(outputData)
    })
  }

}
