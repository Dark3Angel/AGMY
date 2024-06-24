import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface moduleorder {
  "id": number,
  "order": number
}

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private readonly http: HttpClient) { }

  NewModule(name: string, course: number) {
    return this.http.post<any>('/api/courses/newmodule', { name, course });
  }

  NewCourse(name: string, user: number) {
    return this.http.post<any>('/api/courses/newcourse', { name, user });
  }

  CourseUpdate(id: number, name: string, image_path: string) {
    return this.http.patch<any>('/api/courses/updatecourse', { id, name, image_path });
  }

  DeleteCourse(id: number) {
    return this.http.delete<any>('/api/courses/deletecourse/' + id);
  }

  CoursePicLoad(pic: FormData) {
    return this.http.post('/api/courses/coursepic', pic);
  }

  NewCourseDesc(course: number, shortabout: string, learn: string, req: string, about: string, audience: string) {
    return this.http.post<any>('/api/courses/newcoursedesc', { course, shortabout, learn, req, about, audience });
  }
  UpdateCourseDesc(id: number, course: number, shortabout: string, learn: string, req: string, about: string, audience: string) {
    return this.http.put<any>('/api/courses/updatecoursedesc', { id, course, shortabout, learn, req, about, audience });
  }

  FindCourse(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/courses/findcoursebyid', { params: queryParams });
  }

  FindModule(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/courses/findmodule', { params: queryParams });
  }

  CourseList(user: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user", user);
    return this.http.get<any>('/api/courses/courselist', { params: queryParams });
  }

  ModuleListByCourseID(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/courses/modulelist', { params: queryParams });
  }

  UpdateModuleOrder(moduleArray: moduleorder) {
    return this.http.patch<any>('/api/courses/updatemoduleorder', { moduleArray });
  }

  DeleteModule(id: number) {
    return this.http.delete<any>('/api/courses/deletemodule/' + id);
  }

  Allcourses() {
    return this.http.get<any>('/api/courses/allcourses');
  }

  TagFilter(primarytag?: string, secondarytag?: string) {
    let queryParams = new HttpParams();
    if (primarytag == null) {
      return this.http.get<any>('/api/courses/catalog/tags');
    } else if (secondarytag == null) {
      queryParams = queryParams.append("primarytag", primarytag);
      return this.http.get<any>('/api/courses/catalog/tags', { params: queryParams });
    }
    queryParams = queryParams.append("primarytag", primarytag);
    queryParams = queryParams.append("secondarytag", secondarytag);
    return this.http.get<any>('/api/courses/catalog/tags', { params: queryParams });
  }

  SearchCourse(searchString?: string) {
    let queryParams = new HttpParams();
    if (searchString == null) {
      return this.http.get<any>('/api/courses/search')
    }
    queryParams = queryParams.append("text", searchString);
    return this.http.get<any>('/api/courses/search', { params: queryParams })
  }

  publishCourse(id: number) {
    return this.http.patch<any>('/api/courses/publish', { id });
  }

}
