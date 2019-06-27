import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {

  visibleTab: Number = 1;
  myForm: FormGroup;
  progress = null;
  selectedFile = null;
  
  constructor(private fb: FormBuilder, public dataService: DataService, public storage: Storage, public router: Router) {  
  }

  ngOnInit() { 
    this.myForm = this.fb.group({
      name: ['', [Validators.required]],
      card: ['', [Validators.required]],
      un: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      email: ['', [Validators.required]],
      pw: ['', [Validators.required]],
      cpw: ['', [Validators.required]]
    });
  }

  register() {
    this.visibleTab = 2;
  }

  onUpload() {
    if (this.selectedFile != null) {
      const formData = new FormData();
      formData.append('name', this.myForm.value.name);
      formData.append('card', this.myForm.value.card);
      formData.append('sno', this.myForm.value.sno);
      formData.append('tpno', this.myForm.value.tpno);
      formData.append('email', this.myForm.value.email);
      formData.append('password', this.myForm.value.password);
      formData.append('image', this.selectedFile);
      this.dataService.create(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          if (event.status === 200) {
            this.visibleTab = 200;
          }
        }
        console.log(event);
      });
    }
  }

}
