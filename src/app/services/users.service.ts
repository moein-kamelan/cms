import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL: string = environment.baseURL;
paginationSub = new BehaviorSubject({
  "pageNumber": 1,
  "pageSize": 5
})

usersSub = new Subject()

  token: string | null =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  GetCurrentUser() {
    console.log(this.token);

    return this.http.get(`${this.baseURL}/Users/GetCurrentUser`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  GetAllUsersWithPagination(paginationInfos: {
    pageNumber: number;
    pageSize: number;
  }) {
    return this.http.post(
      `${this.baseURL}/Users/GetAllUsersWithPagination`,
      JSON.stringify(paginationInfos),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.token}`,
        },
      }
    );
  }

  DeleteUserById(id: any) {


    return this.http.delete(`${this.baseURL}/Users/DeleteUserById`, {
      body: {
        id,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    });
  }


  GetUserById(id : any) {
    return this.http.get(`${this.baseURL}/Users/GetUserById?id=${id}`, {
      headers : {
        Authorization : `Bearer ${this.token}`
      }
  })
  
} 
}
