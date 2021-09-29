import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
 form!: FormGroup 
  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl("",Validators.required),
      password: new FormControl(null,Validators.required)
    })

  }
  send(){
    const formData = {...this.form.value}
    console.log(formData)
  }
  
}
