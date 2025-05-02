import { JsonPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from './modal/LoginResponse';
import { StudentLoginDetails } from './modal/StudentLoginDetails';
import { LoginServiceService } from '../../services/login/login-service.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  customerFormInfo!: FormGroup;
  resultedData?: LoginResponse;
  isCredentialCorrect = signal(true);
  loginMessage = signal('');


  constructor(private http: HttpClient, private router: Router) { }
  loginServices = inject(LoginServiceService);

  ngOnInit(): void {
    this.initializeForm();
    this.customerFormInfo.get('username')?.valueChanges.subscribe(value => {
      this.loginMessage.set('');
    });
    this.customerFormInfo.get('password')?.valueChanges.subscribe(value => {
      this.loginMessage.set('');
    });
  }

  private initializeForm(): void {
    this.customerFormInfo = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  onSubmit(): void {
    try {
      if (this.customerFormInfo.invalid) {
        this.loginMessage.set('please Enter valid Credential');
        // console.error("Validation Error: Form is invalid!");
        return;
      }

      const studentLogin: StudentLoginDetails = this.customerFormInfo.value;
      this.loginServices.authenticateUser(studentLogin).subscribe({
        next: (result) => {
          this.resultedData = result;
          document.cookie = `jwt-token=${result.jwtToken}; path=/;`;
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.error("Authentication failed:", err);

          if (err.status === 0) {
            this.loginMessage.set('Network Error: Unable to connect to the server');
          } else if (err.status >= 400 && err.status < 500) {
            this.isCredentialCorrect.set(false);
            this.loginMessage.set(err.message);
          } else if (err.status >= 500) {
            this.loginMessage.set('Internal server issue');
          } else {
            this.loginMessage.set('err.message');
          }
        }
      });
    } catch (error) {
      console.error("Unexpected Exception:", error);
    }
  }
}