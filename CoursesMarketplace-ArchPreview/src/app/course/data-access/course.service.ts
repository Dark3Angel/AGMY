import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Signing{
  courseid:number,
  userid:number
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) { }

  FindCourseByTranslit(translit: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("translit", translit);
    return this.http.get<any>('/api/courses/findcoursebytranslit', { params: queryParams });
  }

  ModuleListByCourseID(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/courses/modulelist', { params: queryParams });
  }

  ReturnStudy(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/studies/study', { params: queryParams });
  }

  ReturnStudybyType(id: number, type_content: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    queryParams = queryParams.append("type_content", type_content);
    return this.http.get<any>('/api/studies/studybytype', { params: queryParams });
  }

  SignUserToCourse(sign: Signing): Observable<any> {
    return this.http.post('/api/user/coursesign',sign)
  }

}
