import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

export interface User {
  name: string;
  phone: number;
  email: string;
  isSeller: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl:  './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  spinner = true;
  user: User;
  constructor(private httpService: HttpService,
              private router: Router,
              private authService: AuthService) {
                this.getProfile();
              }
  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.httpService.getServer('/user/profile').subscribe( data => {
      console.log(data);
      if (!window.localStorage.getItem('token') || !data['success']) {
        this.authService.isAuth();
        window.localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else {
        this.spinner = false;
        this.user = data['data'];
        console.log(this.user);
        console.log('---------------------');

        console.log(this.user);
      }
    });
  }
  onSeller() {
    this.spinner = true;
    this.httpService.putServer('/user/update', { isSeller: !this.user.isSeller }).subscribe( result => {
      console.log(result);
      if (!result['success']) {
        this.authService.isAuth();
        window.localStorage.removeItem('token');
        this.router.navigate(['/login']);
      } else {
        this.spinner = false;
        this.user.isSeller = result['data'];
        console.log(this.user.isSeller);
      }
    });

  }
}
