import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
 form!: FormGroup 
 showAlertLogin = 'Логин'
 showAlertPassword = 'Пароль'

  constructor(private requests: RequestService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl("",Validators.required),
      password: new FormControl(null,Validators.required)
    })

    if(localStorage.getItem('access_token')) {
      this.router.navigate(['/announcement'])
    } else {
      this.router.navigate(['/'])
    }

  }
  send(){
    const formData = {...this.form.value}
    if(formData.login == '' || formData.password == null) {
      this.showAlertLogin = 'Поля не может быть пустым'
      this.showAlertPassword = 'Поля не может быть пустым'
    } else {
      this.requests.authRequests(formData.login, formData.password).subscribe( (response: any) => {
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('user', response.user)
        this.router.navigate(["/announcement"])
      }, error => {
        alert(error.error.Error);
      })
    }
  }
  
}
