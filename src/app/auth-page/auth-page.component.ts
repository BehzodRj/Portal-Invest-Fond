import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
 form!: FormGroup 
 changeType: any = 'password'
 showAlertEmail = 'Ваш E-mail'
 showAlertPassword = 'Пароль'
 isLoading = false

  constructor(private requests: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl(null, Validators.required)
    })
    
    if(localStorage.getItem('access_token')) {
      var token: any = localStorage.getItem('access_token')
      var decoded: any = jwt_decode(token);
    }
    
    if(localStorage.getItem('access_token') && decoded.role == "subscribers") {
      this.router.navigate(['/profile'])
    }
    else if(localStorage.getItem('access_token') && decoded.role == "admin") {
      this.router.navigate(['/admin'])
    }
     else if(localStorage.getItem('access_token') && decoded.role == "anouncer") {
      this.router.navigate(['/announcer'])
    }
  }
  send(){
    const formData = {...this.form.value}
    if(formData.email == '' || formData.password == null) {
      this.showAlertEmail = 'Поля не может быть пустым'
      this.showAlertPassword = 'Поля не может быть пустым'
    } else {
      this.isLoading = true
      this.requests.authRequests(formData.email, formData.password).subscribe( (response: any) => {
        this.isLoading = false
        localStorage.setItem('access_token', response.access_token)
        var token: any = localStorage.getItem('access_token')
        var decoded:any = jwt_decode(token);

        if(decoded.role == "subscribers") {
          this.router.navigate(["/profile"])
        } 
        else if(decoded.role == "admin") {
          this.router.navigate(["/admin"])
        } 
        else if(decoded.role == "anouncer") {
          this.router.navigate(["/announcer"])
        } else {
          this.router.navigate(["/"])
        }
      }, error => {
        this.isLoading = false
        alert(error.message)
      })
    }
  }
  
}
