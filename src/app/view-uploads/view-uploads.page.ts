import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Storage } from '@ionic/storage';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-uploads',
  templateUrl: './view-uploads.page.html',
  styleUrls: ['./view-uploads.page.scss'],
})
export class ViewUploadsPage implements OnInit {

  files: any;
  departments: any;
  dept: any;
  loading = false;
  profile: any;

  constructor(private dataService: DataService, public storage: Storage, public router: Router) {
    this.profile = this.storage.get('currentUser');
    if (this.profile.courses.length > 0 ) {
      this.loading = true;
      this.dataService.getUploads().subscribe(api_data => {
        const data: any = api_data;
        if (!(data.status === 500)) {
          this.files = data.data;
          this.loading = false;
        } else {
          alert(data.message);
        }
      });
      this.dataService.getDepartments().subscribe(api_data => {
        const data: any = api_data;
        if (!(data.status === 500)) {
          this.departments = api_data;
          console.log(this.departments);
        } else {
          alert(data.status);
        }
      });
    } else {

    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  download(content: any) {
    const link = document.createElement('a');
    link.href = './api/file/' + content.fileId + '?fname=' + content.fileName;
    link.download = content.fileName;
    link.click();
  }
  /*  filter(subject) {
     this.loading = true;
     this.dataService.getUploadsBySubject(subject).subscribe(api_data => {
       const data: any = api_data;
       if (!(data.status === 500)) {
         this.files = data.data;
         this.loading = false;
         console.log(this.files);
       } else {
         alert(data.status);
       }
      });
   } */
  ngOnInit() {}

}
