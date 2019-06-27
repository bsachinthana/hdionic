import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public dataService: DataService, public storage: Storage, public router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      un: ['', [Validators.required]],
      pw: ['', [Validators.required]]
    });
  }

  login() {
    this.dataService.login(this.loginForm.value)
      .subscribe(
        api_data => {
          const data: any = api_data;
          if (data.status === 200) {
            // localStorage.setItem('currentUser', JSON.stringify(data.data));
            this.storage.set('currentUser', JSON.stringify(data.data)).then(res => {
              console.log(res);
              console.log('success saving user');
              this.router.navigate(['view']);
            });
          } else {
            if (data.message === 'USER_NOT_ACTIVE') {
              console.log('Your account is not active. Please check your mail for confirmation email');
            } else {
              console.log(data.message);
            }
          }
        },
        error => {
          console.log(error);
        });
  }

}
