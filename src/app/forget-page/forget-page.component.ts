import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.scss']
})
export class ForgetPageComponent implements OnInit {
  formForget!: FormGroup
  isLoading = false
  modalMes = false
  showAlertEmail = "Ваш E-mail"

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.formForget = new FormGroup({
      email: new FormControl('', Validators.email)
    })
  }

  send(value:any) {    
    const formForgetData = {...this.formForget.value}
    if(formForgetData.email == '') {
      this.showAlertEmail = 'Поля не может быть пустым'
    } else if(value == false) {
      alert('Введите адрес электронной почты')
    } else {
      this.modalMes = true
      console.log(formForgetData);
    }
  }

  modalBut() {
    this.router.navigate(['/'])
  }

}
