import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{

  CustomerFormGroup!:FormGroup;
  constructor(private customerService:CustomerService,private router:Router){}
  ngOnInit(): void {
    // this.CustomerFormGroup= new FormGroupcustomer({
    //   name: new FormControl ('', [Validators.required]),
    //   phone: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // 10-digit phone number
    //   email: new FormControl ('', [Validators.required, Validators.email]),
    //   dob: new FormControl ('', [Validators.required]),
    //   address: new FormControl ('', [Validators.required]),
    //   description: new FormControl ('',[Validators.required])
    // })

    this.CustomerFormGroup = this.customerService.formValidation();
  }



  get form() {
    return this.CustomerFormGroup.controls;
  }

  submit(){
    this.customerService.create(this.CustomerFormGroup.value).subscribe((res:any)=>{
      console.log('Customer created');
      this.router.navigateByUrl('/dashboard');
    })
  }
  
}
