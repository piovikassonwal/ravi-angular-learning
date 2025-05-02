import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = 'http://localhost:8080/api/customers'; // Adjust based on your backend endpoint
  constructor(private http: HttpClient) {}

  verifyOtp(email: string, otp: string): Observable<boolean> {
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    return this.http.get<boolean>(`${this.apiUrl}/verify-otp`, { params });
  }

}
