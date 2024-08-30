import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(public auth: AuthServiceService){

  }

  logout(){
    //remove token
    try {
      this.auth.removeToken();
      this.auth.canAccess();
      console.log('Token removed successfully');
      // Perform any additional actions after removing the token
    } catch (error) {
      console.error('Error removing token:', error);
    }
  }
}
