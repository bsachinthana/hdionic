import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
// 'http://b54fileshare.herokuapp.com'
export class DataService {
  prefix: String = 'http://localhost:3000';
  // prefix: String = 'http://b54fileshare.herokuapp.com';
  result: any;

  constructor(private http: HttpClient) { }
  approve(sno, id) {
    return this.http.post(this.prefix + '/api/user/approve', { 'sno': sno, 'id': id });
  }
  create(user) {
    const newHeaders = new HttpHeaders().delete('content-type');
    // return this.http.request('post', this.prefix + '/api/user/register', {body: user , headers : newHeaders, reportProgress : true});

    return this.http.post(this.prefix + '/api/user/register', user, { reportProgress: true, observe: 'events', headers: newHeaders });
  }
  upload(content) {
    return this.http.post(this.prefix + '/api/upload', content, { reportProgress: true, observe: 'events' });
  }
  login(cred: any) {
    return this.http.post(this.prefix + '/api/user/login', cred);
  }

  getSubjects() {
    return this.http.get(this.prefix + '/api/util/subjects');
  }

  getDepartments() {
    return this.http.get(this.prefix + '/api/util/departments');
  }
  getUploads() {
    return this.http.get(this.prefix + '/api/upload');
  }

  getUploadsBySubject(subject) {
    return this.http.get(this.prefix + '/api/upload/' + subject);
  }

  getPendingAccounts() {
    return this.http.get(this.prefix + '/api/user/pending');
  }

  getImage(imageUrl: string) {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }
  getConfirmation(id: string, token: string) {
    return this.http.post(this.prefix + '/api/user/confirmation', { 'id': id, 'token': token });
  }
  validate() {
    return this.http.get(this.prefix + '/api/user/validate');
  }

  getAllSubjects() {
    return this.http.get(this.prefix + '/api/util/allSubjects');
  }
}
