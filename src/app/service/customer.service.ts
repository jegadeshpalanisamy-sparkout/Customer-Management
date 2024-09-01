import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../customer/interface/customer';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseApiURL='http://127.0.0.1:8000/api';
  httpOptions = {
    headers : new HttpHeaders({
      'Content-type' : 'application/json'
    })
  }
  constructor(private http:HttpClient) { }


  getAll():Observable<Customer[]>{
    return this.http.get<Customer[]>(this.baseApiURL+'/customers/')
    .pipe(
      catchError(this.errorHandler)
    )
  }


  create(customer:any):Observable<Customer>{
    return this.http.post<Customer>(this.baseApiURL+'/customers/',JSON.stringify(customer),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  find(id:any):Observable<Customer>{
    return this.http.get<Customer>(this.baseApiURL+'/customers/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id:any,customer:any):Observable<Customer>{
    return this.http.put<Customer>(this.baseApiURL+'/customers/'+id,JSON.stringify(customer),this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  delete(id:any):Observable<Customer>{
    return this.http.delete<Customer>(this.baseApiURL+'/customers/'+id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any){
    let errorMessage='';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = `Error code ${error.status}\n Messaage:${error.message}`
    }
    return throwError(errorMessage)
  }

  formValidation(){

    return new FormGroup({
      name: new FormControl ('', [Validators.required]),
      phone: new FormControl ('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // 10-digit phone number
      email: new FormControl ('', [Validators.required, Validators.email]),
      dob: new FormControl ('', [Validators.required]),
      address: new FormControl ('', [Validators.required]),
      description: new FormControl ('',[Validators.required])
    })
  }
}
