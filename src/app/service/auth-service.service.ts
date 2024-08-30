import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private router:Router,private http: HttpClient) { }

  //check user is login or not based on token
  isAutheticated():boolean {
    if(localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  //check access
  canAccess(){
    if(!this.isAutheticated()) {
      console.log("un auth");
      this.router.navigate(['/login']);
    }
  }

  //already registered and login user can only access dashboard page
  canAutheticate(){ 
    if(this.isAutheticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  register(name:string,email:string,password:string,phone:string) {
    //send data to register api test(firebase apu)
    return this.http
    .post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqRuhZY8lSNdRg-oFfUI4P-3VAsHdLnho',
      {displayName:name,email,password,phone});
  }


  storeToken(token:string){
    localStorage.setItem('token',token);
  }

  login(email:string,password:string){
        //send data to login api test(firebase apu)
    return this.http.post<{idToken:string}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqRuhZY8lSNdRg-oFfUI4P-3VAsHdLnho',
      {email,password}
    )

  }

  detail(){
    let token=localStorage.getItem('token');
    return this.http.post<{users:Array<{localId:string,displayName:string}>}>(
      'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBqRuhZY8lSNdRg-oFfUI4P-3VAsHdLnho',
      {idToken:token}
    )
  }

  removeToken(){
    return localStorage.removeItem('token');

  }
}
 