import { CourseService } from "../../data-access/course.service";
import { CoursePreviewComponent } from "../course-preview/course-preview.component";
import { CourseSyllabusComponent } from "../course-syllabus/course-syllabus.component";

export default [
  {
    path: '',
    providers: [CourseService],
    children: [
      {
        path: ':translit',
        component: CoursePreviewComponent
      },
      {
        path:':cid/syllabus/study/:sid',
        component: CourseSyllabusComponent
      }
    ]
  }
]