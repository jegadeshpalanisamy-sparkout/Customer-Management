import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SpinnerComponent,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  isLoading = false;
  errorMessage:string='';

  constructor(private auth: AuthServiceService) {  


  }
  ngOnInit(): void {//register and login user cannot access this register component
    this.auth.canAutheticate();
  }
  registerForm=new FormGroup({
    name: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    phone: new FormControl('',[Validators.required,Validators.pattern(/^\d{10}$/)])
  })

  onSubmit() {
    if(this.registerForm.valid) {
      console.log('Form Submitted', this.registerForm.value);
      this.isLoading = true; // Show spinner
      // setTimeout(() => {
      //   this.isLoading = false; // Hide spinner after the operation
      //   // Handle successful registration logic here
      //   alert('Registration Successful');
      // }, 2000); // Simulated delay
         // Ensure all values are strings, using a fallback empty string if necessary
      const name = this.registerForm.value.name ?? '';
      const email = this.registerForm.value.email ?? '';
      const password = this.registerForm.value.password ?? '';
      const phone = this.registerForm.value.phone ?? '';
      // debugger;
      this.auth.register(name, email, password, phone)
                .subscribe({
                      next:data=>{//if response success
                        //store token from response
                        this.auth.storeToken(data.idToken);
                        console.log('Registration token:',data.idToken);
                        this.auth.canAutheticate();
                        
                      },
                      error:data=>{//if response error
                        if(data.error.error.message=="INVALID_EMAIL"){
                          this.errorMessage = 'Invalid Email'
                        } else if(data.error.error.message=="EMAIL_EXISTS") {
                          this.errorMessage = 'Already Email Exists'
                        } else {
                          this.errorMessage = 'Unknow error occured'
                        }                    
                      }
                }).add(()=>{
                  this.isLoading =false;
                  console.log('registration completed');
                });
  
    }
  }

  get name(){
    return this.registerForm.get('name');
  }

  get email(){
    return this.registerForm.get('email');
  
  }

  get password(){
    return this.registerForm.get('password');
  }

  get phone(){
    return this.registerForm.get('phone');
  }
}
