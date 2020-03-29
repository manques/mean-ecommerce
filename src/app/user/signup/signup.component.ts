import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {
  dialogData = {
    title: '',
    content: '',
    no: '',
    yes: ''
  };
  spinner = false ;
  hide = false;
  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required ],
    phone: ['', Validators.required],
    password: ['', Validators.required],
    isSeller: [ false]
  });
  constructor( private fb: FormBuilder,
               private httpService: HttpService,
               private router: Router,
               private dialog: MatDialog ) {
                 window.localStorage.removeItem('token');
               }
  onSubmit() {
    this.spinner = true;
    console.log(this.signupForm);
    this.httpService.postServer('/user/signup', {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      phone: this.signupForm.value.phone,
      password: this.signupForm.value.password,
      isSeller: this.signupForm.value.isSeller
    }).subscribe( data => {
      console.log(data);
      this.spinner = false;
      if (data['success']) {
        this.router.navigate(['/login']);
      } else {
        this.dialogData.title = data['message'];
        this.dialogData.content = 'Do want login / stay on';
        this.dialogData.no = 'NO';
        this.dialogData.yes = 'Login';
        this.openDialog();
        console.log(this.dialogData);
      }
    });
  }
  reset() {
    this.signupForm.reset();
  }

  // dialog
  openDialog(): void {
    console.log(this.dialogData);
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      height: '200px',
      data: this.dialogData
    });
    dialogRef.afterClosed().subscribe( result => {
      console.log(result);
      if (result) {
         this.router.navigate(['/login']);
      } else {
        console.log('stay on!!');
      }
    });
  }
}
