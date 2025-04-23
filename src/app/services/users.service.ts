import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL: string = environment.baseURL;
  paginationSub = new BehaviorSubject({
    pageNumber: 1,
    pageSize: 5,
  });

  usersSub = new Subject();
  changeSortSub = new Subject();
  changePageSub = new Subject();

  emitSortOption(sortOption: string) {
    this.changeSortSub.next(sortOption);
  }

  token: string | null =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  GetCurrentUser() {
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
      },
    });
  }

  GetUserById(id: any) {
    return this.http.get(`${this.baseURL}/Users/GetUserById?id=${id}`);
  }

  UpdateUserPersonalInformation(userEditedInfos: any) {
    return this.http
      .put(
        `${this.baseURL}/Users/UpdateUserPersonalInformation`,
        JSON.stringify(userEditedInfos),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return of(null);
        })
      );
  }

  RegisterNewUser(userInfos: any) {
    return this.http.post(
      `${this.baseURL}/Users/RegisterNewUser`,
      JSON.stringify(userInfos),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
