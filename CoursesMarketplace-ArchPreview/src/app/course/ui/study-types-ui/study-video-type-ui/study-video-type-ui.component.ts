import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-study-video-type-ui',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './study-video-type-ui.component.html',
  styleUrl: './study-video-type-ui.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyVideoTypeUiComponent implements OnChanges { 
  constructor(private sanitizer: DomSanitizer){}

  @Input() path:string | undefined
  
  iframeSrc: SafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('')

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['path'].currentValue != undefined){
      this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.path!);
    }
  }
}
