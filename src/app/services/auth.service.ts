import { Injectable } from '@angular/core';
import { Personal } from '../models/personal';
import { HttpClient } from '@angular/common/http';
import { Legal } from '../models/legal';
import { Login } from '../models/login';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = environment.baseURL;
  constructor(private http: HttpClient) {}

  createPersonalAccount(person: Personal) {
    console.log('person:', person)

    return this.http.post(`${this.baseURL}/Account/PersonalRegister`, JSON.stringify(person) , {
      headers : {
        "Content-Type" : "application/json"
      }
    });
  }
  createLegalAccount(person: Legal) {
    return this.http.post(`${this.baseURL}/Account/LegalRegister`, JSON.stringify(person) , {
      headers : {
        "Content-Type" : "application/json"
      }
    });
  }

  loginPerson(personInfos: Login) {
    console.log(personInfos);
    return this.http.post(`${this.baseURL}/Account/Login`, JSON.stringify(personInfos) , {
      headers : {
        "Content-Type" : "application/json"
      }

    }
  )}
}
