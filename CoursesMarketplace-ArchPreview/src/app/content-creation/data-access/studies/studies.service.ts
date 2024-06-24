import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudiesService {
  constructor(private readonly http: HttpClient) { }

  NewStudy(name: string, user: number) {
    return this.http.post<any>('/api/studies/newstudy', { name, user });
  }

  NewTextStudy(content: string) {
    return this.http.post<any>('/api/studies/newtextstudy', { content });
  }

  NewVideoStudy(id_video: string) {
    return this.http.post<any>('/api/studies/newvideostudy', { id_video });
  }

  ReturnStudies(user: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("user", user);
    return this.http.get<any>('/api/studies/studylist', { params: queryParams });
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

  UpdateStudyTypeContent(id: number, type_content: number) {
    return this.http.patch<any>('/api/studies/updateTypeContent', { id, type_content });
  }

  UpdateStudyIdContent(id: number, id_content: number) {
    return this.http.patch<any>('/api/studies/updateIdContent', { id, id_content });
  }

  UpdateCourseAndModule(id: number, course: number, module: number) {
    return this.http.patch<any>('/api/studies/updateCourseAndModule', { id, course, module });
  }

  UpdateTextContent(id: number, content: string) {
    return this.http.patch<any>('/api/studies/updateTextContent', { id, content });
  }

  UpdateVideoContent(id: number, id_video: string) {
    return this.http.patch<any>('/api/studies/updateVideoContent', { id, id_video });
  }

  GetTextContent(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/studies/getTextContent', { params: queryParams });
  }

  GetVideoContent(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/studies/getVideoContent', { params: queryParams });
  }

  VideoUpload(video: FormData) {
    return this.http.post('/api/studies/videoupload', video);
  }

  StudyListByModule(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<any>('/api/studies/studylistbymodule', { params: queryParams });
  }

  DeleteStudy(id: number) {
    return this.http.delete<any>('/api/studies/deletestudy/' + id);
  }

}
