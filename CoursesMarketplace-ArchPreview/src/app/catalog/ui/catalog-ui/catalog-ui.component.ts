import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CourseCardsUiComponent } from '../../../shared/ui/course-cards-ui/course-cards-ui.component';

@Component({
    selector: 'app-catalog-ui',
    templateUrl: './catalog-ui.component.html',
    styleUrls: ['./catalog-ui.component.less'],
    standalone: true,
    imports: [CourseCardsUiComponent]
})
export class CatalogUiComponent implements  OnInit {

  @Input() courses:any
  @Input() showmessage:string = ''

  ngOnInit(): void {
    
  }

}
