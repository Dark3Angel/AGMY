import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private readonly http: HttpClient) { }

  pfpLoad(pfp:FormData){
    return this.http.post('/api/user/pfpload', pfp );
  }

  UserUpdate( id:number,name:string, secondname:string, about:string, pfp_path?:string){
    return this.http.patch('/api/user/updateuser',{id, name, secondname, about, pfp_path})
  }
}
