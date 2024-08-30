import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,SpinnerComponent,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthServiceService){}

  ngOnInit(): void { //register and login user cannot access this login component
    this.auth.canAutheticate();
  }

  isLoading:boolean=false;
  errorMessage:string='';

  loginForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  })


  get email(){
    return this.loginForm.get('email');
  
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit(){
    console.log(this.loginForm)
    if(this.loginForm.valid){
      this.isLoading=true;

     const email = this.loginForm.value.email ?? '';
     const password= this.loginForm.value.password ?? '';

     this.auth.login(email,password).subscribe({
      next:data =>{
        console.log(data);
        this.auth.storeToken(data.idToken);
        this.auth.canAutheticate();
      },
      error:data=>{
        if(data.error.error.message == 'INVALID_PASSWORD' || data.error.error.message == 'INVALID_EMAIL') {
          this.errorMessage = "Invalid Credentials";
        } else {
          this.errorMessage = "Unknown error when logging into this account";
        }
      }

     }).add(()=>{
      this.isLoading=false;
      console.log('loggin completed');
     })

    }
  }
}
