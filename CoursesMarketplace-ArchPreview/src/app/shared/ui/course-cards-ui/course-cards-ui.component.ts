import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-course-cards-ui',
    templateUrl: './course-cards-ui.component.html',
    styleUrls: ['./course-cards-ui.component.less'],
    standalone: true,
    imports: [NgIf, NgFor, RouterLink]
})
export class CourseCardsUiComponent implements OnChanges{
  constructor(){}

  @Input() courses:any


  ngOnChanges(changes: SimpleChanges): void {
    if(changes['courses'].currentValue!=null){
      this.loaded=true
    }
  }

  

  path:string = 'http://localhost:3000/courses/images'
  loaded:boolean=false;

}
