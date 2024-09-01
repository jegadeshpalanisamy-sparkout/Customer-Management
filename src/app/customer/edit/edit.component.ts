import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../../service/customer.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{

  id! :number;
  customer! : Customer;
  customerEditFormGroup!:FormGroup;

  constructor(
    public customerService:CustomerService,
    private router:Router,
    private route:ActivatedRoute
  ){}
  

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.find(this.id).subscribe((data:Customer)=>{
      this.customer=data;
    })
    //check vallidation
    this.customerEditFormGroup = this.customerService.formValidation();
   
  }

  get form(){
    return this.customerEditFormGroup.controls;
  }

  submit(){
    console.log(this.customerEditFormGroup.value);

    this.customerService.update(this.id,this.customerEditFormGroup.value).subscribe(res=>{
      console.log('customer updated successfully');
      this.router.navigateByUrl('/dashboard');
    })
  }

}
