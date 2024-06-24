import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { CoursesService } from 'src/app/content-creation/data-access/courses/courses.service';
import { CourseContentUiComponent } from 'src/app/content-creation/ui/courses/course-content-ui/course-content-ui.component';
import { CoursesNavbarUiComponent } from 'src/app/content-creation/ui/courses/courses-navbar-ui/courses-navbar-ui.component';

@Component({
  selector: 'app-course-content',
  standalone: true,
  imports: [
    CommonModule,
    CourseContentUiComponent,
    CoursesNavbarUiComponent,
  ],
  templateUrl: './course-content.component.html',
  styleUrl: './course-content.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseContentComponent {
  constructor(private courseService: CoursesService, private route: ActivatedRoute, private cdr:ChangeDetectorRef) {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.getModules(this.id);
    });
  }

  id: number | undefined;
  private sub: any;
  modules: any = [] // список модулей
  name: string | undefined; // название модуля
  moduleorder: any // список модулей для их порядка в курсе
  moduleorder_send: any = [] //список модулей для отпраки на бэкенд

  getModules(id: number) { //получение списка всех модулей курса
    this.courseService.ModuleListByCourseID(id).subscribe((data) => {
      this.modules = data;
      this.moduleorder = this.modules[0].module
      this.moduleorder.sort((a: { order: number; }, b: { order: number; }) => a.order - b.order);
      this.cdr.detectChanges()
    });
  }

  async deleteModule(id: number) {
    const data = this.courseService.DeleteModule(id)
    const response = await lastValueFrom(data)
    this.getModules(this.id!);
  }

  createModule(name:string) {
    this.courseService.NewModule(name,this.id!).subscribe((data)=> {
    this.getModules(this.id!);
  });
}

  async drop() {
    let counter = 1
    this.moduleorder_send.splice(0)
    await this.moduleorder.forEach((element: { id: number; order: number; }) => {
      const data = {
        "id":element.id,
        "module_order":counter
      }
      this.moduleorder_send.push(data)
      counter ++
    });
    const data = this.courseService.UpdateModuleOrder(this.moduleorder_send)
    const response = await lastValueFrom(data)
  }

}
