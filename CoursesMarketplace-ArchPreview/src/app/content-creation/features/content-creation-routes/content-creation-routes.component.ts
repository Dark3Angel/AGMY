import { CoursesService } from "../../data-access/courses/courses.service";
import { StudiesService } from "../../data-access/studies/studies.service";
import { CourseContentComponent } from "../courses/course-content/course-content.component";
import { CoursesCreationComponent } from "../courses/courses-creation/courses-creation.component";
import { CoursesDescComponent } from "../courses/courses-desc/courses-desc.component";
import { ModuleContentComponent } from "../courses/module-content/module-content.component";
import { StudiesContentComponent } from "../studies/studies-content/studies-content.component";
import { StudiesCreationComponent } from "../studies/studies-creation/studies-creation.component";

export default [
  {
    path: 'courses',
    providers: [CoursesService],
    children: [
      {
        path: '',
        component: CoursesCreationComponent,
      },
      {
        path: ':id/description',
        component: CoursesDescComponent
      },
      {
        path: ':id/content',
        component: CourseContentComponent
      },
      {
        path: 'module/:id',
        component: ModuleContentComponent
      }
    ]
  },
  {
    path: 'studies',
    providers: [StudiesService],
    children: [
      {
        path: '',
        component: StudiesCreationComponent
      },
      {
        path: ':id',
        component: StudiesContentComponent
      }
    ]
  }
]