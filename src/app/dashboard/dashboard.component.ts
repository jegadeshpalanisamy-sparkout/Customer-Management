import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../customer/interface/customer';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user={id:"",name:""}
  customers:Customer[]=[];
  constructor(private auth:AuthServiceService,private customerService:CustomerService){}
  ngOnInit(): void {//only login and register user can access this dashboard component
    this.auth.canAccess()
    if(this.auth.isAutheticated()){
      //user details api called(fire base api)
      this.auth.detail().subscribe({
        next: data=>{
          console.log(data);
          this.user.id=data.users[0].localId;
          this.user.name=data.users[0].displayName;
        },
        error: data=>{
          console.log(data);
          console.log("cannot retrive data");
        }
      })
    }


    this.customerService.getAll().subscribe( (data:Customer[]) =>{
      this.customers = data;
      console.log(this.customers);
    })

    }

    deletePost(id:any) {
      this.customerService.delete(id).subscribe((data)=>{//delete post remove using filter
        this.customers = this.customers.filter(customer => customer.id != id)
        console.log('post deleted');
      })
    }

    

}
