import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile;
  constructor(private ds: DataService) {
    this.ds.getProfile().subscribe(prof => {
      this.profile = prof;
      console.log(prof);
    },
    err => {
      console.log(err);
    })
  }

  ngOnInit() {  

  }

}
