import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{

  id!:number;
  customer!:Customer;

  constructor(
    public customerService:CustomerService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerService.find(this.id).subscribe((data: Customer)=>{
      this.customer=data;
    })
  }
}
