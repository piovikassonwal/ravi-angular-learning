import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  
  customerFormInfo: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mobile: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
    role: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    otpNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]) // ✅ Added OTP
  });

  isOtpCorrect = signal(false);
  isOtpSended = signal(false);
  constructor(private http: HttpClient, private router: Router,private signupService : SignupService) {}
  ngOnInit(): void {
  }

  verifyOtp(){
    const currentOtp = this.customerFormInfo.get('otpNumber')?.value;
    const email = this.customerFormInfo.get('email')?.value;
    if(!(currentOtp && email)){
      console.error("Validation Error: otp is missing!");
        return;
    }

    this.signupService.verifyOtp(email,currentOtp).subscribe({
      next:(result)=>{
        this.isOtpCorrect.set(true);
        this.isOtpSended.set(false);
        console.log("verification done");},
      error:(err)=>{
        console.error("have some error");
      }
    });

  }

  sendOTP(): void {
    const email = this.customerFormInfo.get('email')?.value;
    if (!email) {
        console.error("Validation Error: Email is missing!");
        return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post<boolean>(`http://localhost:8080/api/customers/email-otp/${email}`, { headers })
        .subscribe({
            next: (result) => {
              this.isOtpSended.set(true);
              console.log("OTP sent successfully.");},
            error: (err) => console.error("Error sending OTP:", err)
        });
}

  onSubmit(): void {
    if (!this.customerFormInfo.valid) {
      console.error("Form validation failed.");
      return;
    }

    const customerData = this.customerFormInfo.value;
    if (customerData.password !== customerData.confirmPassword) {
      console.error("Passwords do not match.");
      return;
    }

    this.http.post<boolean>("http://localhost:8080/api/customers/", customerData).subscribe({
      next: (result) => {
        if (result) {
          console.log("Customer successfully registered.");
          this.router.navigate(['/success']);
        }
      },
      error: (err) => console.error("Error registering customer:", err)
    });
  }
}