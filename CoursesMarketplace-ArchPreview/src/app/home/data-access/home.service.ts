import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private readonly http: HttpClient) { }

  Allcourses() {
		return this.http.get<any>('/api/courses/allcourses');
	}

}
