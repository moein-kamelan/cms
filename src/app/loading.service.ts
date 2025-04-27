import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private __loading = new BehaviorSubject<boolean>(false)
  loading$ = this.__loading.asObservable()


  show() {
    this.__loading.next(true)
  }
  hide() {
    this.__loading.next(false)
  }
  
  
  
  
  constructor() { }
}
