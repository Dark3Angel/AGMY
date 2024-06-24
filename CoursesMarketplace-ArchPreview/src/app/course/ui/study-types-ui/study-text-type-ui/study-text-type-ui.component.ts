import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StudyTextReadOnlyEditorConfig } from 'src/app/utils/configs/editor-configs/study-text/study-text-readonly-config';
import EditorJS from "@editorjs/editorjs";
@Component({
  selector: 'app-study-text-type-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './study-text-type-ui.component.html',
  styleUrl: './study-text-type-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyTextTypeUiComponent implements OnChanges, OnInit { 

  @Input() textStudy:any

  editor:any

  ngOnInit(): void {
    this.editor = new EditorJS(StudyTextReadOnlyEditorConfig); // инициализация редактора
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['textStudy'].currentValue != undefined){
      this.editor.isReady
      .then(() => {
          // Fill Editor with blocks data in json
          this.LoadData();
      })
    }
  }

  LoadData() { //загрузка данных в едитор
    var JsonContent = JSON.parse(this.textStudy);
    this.editor.blocks.render(JsonContent);
  }

}
