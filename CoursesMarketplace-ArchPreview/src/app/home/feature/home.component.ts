import { Component, OnInit } from '@angular/core';
import { HomeService } from '../data-access/home.service';
import { lastValueFrom } from 'rxjs';
import { CourseCardsUiComponent } from '../../shared/ui/course-cards-ui/course-cards-ui.component';
import { CarouselUiComponent } from '../ui/carousel-ui/carousel-ui.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    standalone: true,
    imports: [CarouselUiComponent, CourseCardsUiComponent]
})
export class HomeComponent implements OnInit {
  constructor(private homeService:HomeService){}

  async ngOnInit() {
    const request = this.homeService.Allcourses()
    const response = await lastValueFrom(request)
    this.coursesData=response
  }
  
  coursesData:any

}
