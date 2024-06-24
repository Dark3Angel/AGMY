import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AboutEditorConfig } from 'src/app/utils/configs/editor-configs/about/about-config';
import EditorJS from "@editorjs/editorjs";
import { FormsModule } from '@angular/forms';

interface updateDesc {
  data:Data
  image:FileList
}

interface Data {
  id: number
  name: string
  image_path: string
  coursedesc: coursedesc
}

interface coursedesc {
  id: number
  shortabout: string
  learn: string
  req: string
  audience: string
  about: string
}

@Component({
  selector: 'app-courses-desc-ui',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './courses-desc-ui.component.html',
  styleUrl: './courses-desc-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDescUiComponent implements OnChanges {
  constructor(private cdr:ChangeDetectorRef){}

  @Input() data: Data = {
    id: 0,
    image_path: '',
    name: '',
    coursedesc: {
      id: 0,
      shortabout: '',
      learn: '',
      req: '',
      audience: '',
      about: ''
    }
  }

  @Output() updateDescription = new EventEmitter<updateDesc>()

  coursepic: string | null | ArrayBuffer = '';
  AboutEditor: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data.id != 0) {
      this.coursepic = "http://localhost:3000/courses/images" + this.data.image_path
      this.AboutEditor = new EditorJS(AboutEditorConfig) // инициализация едитора
      this.AboutEditor.isReady
        .then(() => {
          // Fill Editor with blocks data in json
          this.LoadData();
        })
    }
  }

  LoadData() { // загрузка блоков в едитор из БД
    var JsonContent = JSON.parse(this.data.coursedesc.about);
    this.AboutEditor.blocks.render(JsonContent);
  }

  onSaveButton(files: FileList) {
    this.AboutEditor.save().then((outputData: any) => {
      this.data.coursedesc.about = JSON.stringify(outputData)
      const updateObj = {
        data:this.data,
        image:files
      }
      this.updateDescription.emit(updateObj)
    })
  }

  onFileSelected(files: FileList | null) { // при загрузке фото в инпут
    if (files) {
      var reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event: Event) => {
        let fileReader = event.target as FileReader
        this.coursepic = fileReader.result;
        this.cdr.detectChanges()
      }
    }
  }

}
