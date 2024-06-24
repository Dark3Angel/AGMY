import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private readonly http: HttpClient) { }

  TagFilter(primarytag?:string,secondarytag?:string) {
    let queryParams = new HttpParams();
    if(primarytag==null){
      return this.http.get<any>('/api/courses/catalog/tags');
    } else if(secondarytag==null){
      queryParams = queryParams.append("primarytag",primarytag);
      return this.http.get<any>('/api/courses/catalog/tags',{params:queryParams});
    }
    queryParams = queryParams.append("primarytag",primarytag);
    queryParams = queryParams.append("secondarytag",secondarytag);
    return this.http.get<any>('/api/courses/catalog/tags',{params:queryParams});
    }
  
    SearchCourse(searchString?:string){
    let queryParams = new HttpParams();
    if(searchString==null){
      return this.http.get<any>('/api/courses/search')
    }
    queryParams = queryParams.append("text",searchString);
    return this.http.get<any>('/api/courses/search',{params:queryParams})
    }

}
