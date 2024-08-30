import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  user={id:"",name:""}
  constructor(private auth:AuthServiceService){}
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
    }

    

}
