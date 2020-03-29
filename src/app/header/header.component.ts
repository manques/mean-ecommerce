import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class AppHeaderComponent implements OnInit {
  auth = false;
  @Output() sidenavToggler = new EventEmitter();
  constructor(private authService: AuthService,
              private router: Router) {
    // this.auth = window.localStorage.getItem('token') ? true : false;
  }
  ngOnInit() {
    this.authService.authChange.subscribe( data => {
      this.auth = data;
    });
  }

  logout() {
    window.localStorage.removeItem('token');
    this.auth = false;
    this.router.navigate(['/login']);
  }
}
