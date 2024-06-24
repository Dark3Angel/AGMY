import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '../data-access/catalog.service';
import { lastValueFrom } from 'rxjs';
import { CatalogUiComponent } from '../ui/catalog-ui/catalog-ui.component';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.less'],
    standalone: true,
    imports: [CatalogUiComponent]
})
export class CatalogComponent implements OnInit {
  constructor(private router: Router, private aroute: ActivatedRoute, private catalogService: CatalogService) {
    this.route = this.router.url
    if (this.route.indexOf('search') !== -1) {
      this.route_flag = true
    } else {
      this.route_flag = false
    }
  }

  ngOnInit(): void {
    if (this.route_flag == true) {
      this.QuerySearch()
    } else
      if (this.route_flag == false) {
        this.TagsSearch()
      }
  }

  async QuerySearch() {
    this.aroute.queryParamMap
      .subscribe((params) => {
        this.search = { ...params };
      });
    this.showmessage = 'Курсы по поиску '+ this.search.params.text
    const request = this.catalogService.SearchCourse(this.search.params.text)
    const response = await lastValueFrom(request)
    this.courses = response.courses
  }

  async TagsSearch() {
    this.sub = this.aroute.params.subscribe((params) => {
      this.primary_tag = params['primary_tag'];
      this.secondary_tag = params['secondary_tag']
    })
    const request = this.catalogService.TagFilter(this.primary_tag, this.secondary_tag)
    const response = await lastValueFrom(request)
    this.showmessage = 'Курсы по тэгам ' + response.primarytag[0].name
    if(response.secondarytag!=null){
      this.showmessage += ' < ' + response.secondarytag[0].name
    }
    this.courses = response.courses
  }

  search: any
  route: string
  route_flag: boolean
  courses: any
  private sub: any;
  primary_tag: any
  secondary_tag: any
  showmessage:string = ''
}
