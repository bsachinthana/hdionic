import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-select-courses',
  templateUrl: './select-courses.component.html',
  styleUrls: ['./select-courses.component.scss'],
})
export class SelectCoursesComponent implements OnInit {
  subjects;
  constructor(private ds: DataService) {
    this.ds.getAllSubjects().subscribe(sub => {
      this.subjects = sub;
    }, err => {
      alert(err);
      console.log(err.message);
    });
  }
  ngOnInit() {}
}
