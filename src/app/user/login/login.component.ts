import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  spinner = false;
  dialogData = {
    title: '',
    content: '',
    yes: '',
    no: ''
  };
  hide = false;
  loginForm = this.fb.group({
    emailPhone: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
              private http: HttpService,
              private dialog: MatDialog,
              private router: Router,
              private authService: AuthService) {}
  onSubmit() {
    this.spinner = true;
    console.log(this.loginForm);
    this.http.postServer('/user/login', {
      emailPhone: this.loginForm.value.emailPhone,
      password: this.loginForm.value.password
    }).subscribe(data => {
      console.log(data);
      if (!data['success']) {
        this.dialogData.title = data['message'];
        this.dialogData.content = 'Login again';
        this.openDialog();
      } else {
        this.spinner = false;
        window.localStorage.setItem('token', data['token']);
        this.authService.isAuth();
        this.router.navigate(['/']);
      }
    });
  }

  reset() {
    this.loginForm.reset();
  }


  openDialog() {
    const dialogRef = this.dialog.open( DialogLoginComponent, {
      width: '300px',
      height: '200px',
      data: this.dialogData
    });
    dialogRef.afterClosed().subscribe( result => {
      if (!result) {
        this.spinner = false;
        console.log('stay on!!');
      }
    });
  }
}
