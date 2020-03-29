import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  baseUrl = 'http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': ''
    })
  };


  constructor(private http: HttpClient) {}
  // post request
  postServer(url, data) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('token') || '');
    return this.http.post(`${this.baseUrl}${url}`, data, this.httpOptions);
  }
// post file data
postServerFile(url, data) {
  return this.http.post(`${this.baseUrl}${url}`, data);
}

  // get request
  getServer(url) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('token') || '');
    return this.http.get(`${this.baseUrl}${url}`, this.httpOptions);
  }

  // put request for update
  putServer(url, data) {
    console.log(this.httpOptions.headers);
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem('token') || '');
    return this.http.put(`${this.baseUrl}${url}`, data, this.httpOptions);
  }

}
