import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interfaces';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private readonly http: HttpClient) { }

  UserData(mail:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("mail",mail);
		return this.http.get<User>('/api/user/data',{params:queryParams});
	}

  get currentUserMail(): string | null{
    return JSON.parse(localStorage.getItem('currentUser')!).mail
  }
}
