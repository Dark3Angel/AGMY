import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/data-access/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserCoursesService {

  constructor(private readonly http: HttpClient, private readonly userService:UserService) { }

  userCourses(): Observable<any>{
    let queryParams = new HttpParams();
    queryParams = queryParams.append("mail",this.userService.currentUserMail!);
    return this.http.get('/api/user/courses',{params:queryParams});
  }

}
