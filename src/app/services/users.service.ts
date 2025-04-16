import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly baseURL: string = 'http://172.27.60.183:11680';
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

  DeleteUserById(id : any )  {
    // return this.http.post(`${this.baseURL}/DeleteUserById` ,  {
    //   body :  {id : userID},
  
    // })
  
    return this.http.delete(`${this.baseURL}/Users/DeleteUserById`,{
      body:{
        id
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    })
  }





  
  
}
