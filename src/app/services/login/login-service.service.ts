import { Injectable } from '@angular/core';
import { StudentLoginDetails } from '../../pages/login-page/modal/StudentLoginDetails';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }
  
  authenticateUser(data: StudentLoginDetails): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>("http://localhost:8080/authentication/sign-in", data, { headers });
  }
}
