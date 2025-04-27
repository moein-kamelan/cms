import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseURL: string = environment.baseURL;

  resetTableSub = new Subject<boolean>()
  $resetTableSub = this.resetTableSub.asObservable()

  setResetTableSub(data : boolean) {
    this.resetTableSub.next(data)
  }

  token: string | null =
    localStorage.getItem('token') || sessionStorage.getItem('token');

  constructor(private http: HttpClient) {}

  GetCurrentUser() {
    return this.http.get(`${this.baseURL}/Users/GetCurrentUser`);
  }

  GetAllUsersWithPagination(paginationInfos: any) {
    return this.http.post(
      `${this.baseURL}/Users/GetAllUsersWithPagination`,
      JSON.stringify(paginationInfos) , {
        headers : {
          "Content-Type" : "application/json"
        }
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
    return this.http.put(
      `${this.baseURL}/Users/UpdateUserPersonalInformation`,
      JSON.stringify(userEditedInfos) , {
        headers : {
          "Content-Type" : "application/json"
        }
      }
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
