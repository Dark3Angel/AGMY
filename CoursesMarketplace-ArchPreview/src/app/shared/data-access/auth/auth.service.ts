import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface User {
	accessToken: string;
	expiresIn: Date;
	mail: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

  constructor(private readonly http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
			JSON.parse(localStorage.getItem('currentUser')!)
		);
		this.currentUser = this.currentUserSubject.asObservable();
   }

   login(mail: string, password: string) {
		return this.http.post<any>('/api/auth/login', { mail, password }).pipe(
			map(user => {
				// login successful if there's a jwt token in the response
				if (user && user.accessToken) {
					// store user details and jwt token in local
					// storage to keep user logged in between page refreshes

					localStorage.setItem('currentUser', JSON.stringify(user));
					this.currentUserSubject.next(user);
				}

				return user;
			})
		);
	}

public get currentUserValue(): User {
  return this.currentUserSubject.value;
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  // get the user nulled - typescript won't care
  this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
  this.currentUser = this.currentUserSubject.asObservable();
}

register(name:string, secondname:string, mail: string, password: string, role: string) {
	return this.http.post<any>('/api/auth/reg', { name , secondname , mail, password, role });
}

}
