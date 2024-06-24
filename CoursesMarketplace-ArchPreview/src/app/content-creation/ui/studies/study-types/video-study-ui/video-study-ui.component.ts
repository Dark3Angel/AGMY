import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-video-study-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './video-study-ui.component.html',
  styleUrl: './video-study-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoStudyUiComponent implements OnChanges { 
  constructor(private cdr:ChangeDetectorRef){}

  @Input() contentFromDB: any


  @Output() saveVideo = new EventEmitter<FileList>()

  path: string | null| ArrayBuffer = '';

  onVideoSelected(event: any) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
      this.path = (<FileReader>event.target).result;
      this.cdr.detectChanges()
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contentFromDB'].currentValue != undefined){
      this.path =this.contentFromDB.video_link
    }
  }

  async SaveContent(files: FileList){
    this.saveVideo.emit(files)
  }

}
