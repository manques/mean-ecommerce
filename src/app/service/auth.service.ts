import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  authChange = new Subject<boolean>();

  isAuth() {
    const auth = window.localStorage.getItem('token') ? true : false;
    this.authChange.next(auth);
  }
}
