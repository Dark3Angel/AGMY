import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CoursesService } from 'src/app/content-creation/data-access/courses/courses.service';
import { CoursesDescUiComponent } from 'src/app/content-creation/ui/courses/courses-desc-ui/courses-desc-ui.component';
import { CoursesNavbarUiComponent } from 'src/app/content-creation/ui/courses/courses-navbar-ui/courses-navbar-ui.component';

interface updateDesc {
  data: Data
  image: FileList
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
  selector: 'app-courses-desc',
  standalone: true,
  imports: [
    CommonModule,
    CoursesDescUiComponent,
    CoursesNavbarUiComponent
  ],
  templateUrl: './courses-desc.component.html',
  styleUrl: './courses-desc.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesDescComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private cdr: ChangeDetectorRef
  ) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id']; // переменная из адреса
    });
  }

  ngOnInit(): void {
    this.CourseInfo()
  }

  data: Data = {
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

  id: number | undefined;
  private sub: any;
  image_path: string | undefined

  async CourseInfo() {
    const CourseInfo_req = this.coursesService.FindCourse(this.id!)
    const CourseInfo = await lastValueFrom(CourseInfo_req)
    if(!CourseInfo.coursedesc) CourseInfo.coursedesc = {
      id: 0,
      shortabout: '',
      learn: '',
      req: '',
      audience: '',
      about: ''
    }
    console.log(CourseInfo)
    this.data = CourseInfo
    this.cdr.detectChanges()
  }

  async updateCourseDesc(desc: updateDesc) {
    const image = new FormData();
    if (desc.image[0] != null) {
      const file: File = desc.image[0];
      image.append('image', file, desc.data.id + "*" + file.name)
      const pic = this.coursesService.CoursePicLoad(image);
      const response = await lastValueFrom(pic)
      this.image_path = "/course_" + desc.data.id + "/" + file.name;
    }
    this.AddCourseNameToNav(desc.data.name)
    this.coursesService.CourseUpdate(desc.data.id, desc.data.name, this.image_path!).subscribe()
    if (this.data.coursedesc.id != 0) {
      this.coursesService.UpdateCourseDesc(
        desc.data.coursedesc.id, this.id!,
        desc.data.coursedesc.shortabout,
        desc.data.coursedesc.learn,
        desc.data.coursedesc.req,
        desc.data.coursedesc.about,
        desc.data.coursedesc.audience)
        .subscribe(data => { this.CourseInfo(); });
    }
    else {
      this.coursesService.NewCourseDesc(
        this.id!,
        desc.data.coursedesc.shortabout,
        desc.data.coursedesc.learn,
        desc.data.coursedesc.req,
        desc.data.coursedesc.about,
        desc.data.coursedesc.audience)
        .subscribe(data => { this.CourseInfo(); });
    }
    window.location.reload();
  }

  AddCourseNameToNav(name: string) { // добавление названия курса в локальную переменную
    localStorage.setItem('courseName', name);
  }

}
