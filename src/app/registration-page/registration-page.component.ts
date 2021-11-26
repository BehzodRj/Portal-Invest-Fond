import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  isLoading = false
  registerForm!: FormGroup
  showAlertsName = "Имя"
  showAlertsLast_name = "Фамилия"
  showAlertsMiddle_name = "Отчество"
  showAlertsLogin = 'Логин'
  showAlertsCompanyName = "Наименование компании"
  showAlertsDivision = "Должность"
  showAlertsBirth_city = "Место тождения"
  showAlertsRegCompany = "Место регистрация компании"
  showAlertsInn = "ИНН"
  showAlertsEmail = "Ваш E-mail"
  showAlertsPhone = "Номер телефона"
  showAlertsPassword = "Пароль"

  constructor(private request: RequestService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      last_name: new FormControl(''),
      middle_name: new FormControl(''),
      login: new FormControl(''),
      company_name: new FormControl(''),
      division: new FormControl(''),
      birth_city: new FormControl(''),
      regCompany: new FormControl(''),
      inn: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl('')
    })
  }

  registration() {
    const registerFormData = {...this.registerForm.value}
    if(registerFormData.name == '' || registerFormData.last_name == '' || registerFormData.middle_name == '' || registerFormData.login == '' || registerFormData.company_name == '' || registerFormData.division == '' || registerFormData.birth_city == '' || registerFormData.regCompany == '' || registerFormData.inn == '' || registerFormData.email == '' || registerFormData.phone == '' || registerFormData.password == '') {
      this.showAlertsName = 'Поля не может быть пустым'
      this.showAlertsLast_name = 'Поля не может быть пустым'
      this.showAlertsMiddle_name = 'Поля не может быть пустым'
      this.showAlertsLogin = 'Поля не может быть пустым'
      this.showAlertsCompanyName = 'Поля не может быть пустым'
      this.showAlertsDivision = 'Поля не может быть пустым'
      this.showAlertsBirth_city = 'Поля не может быть пустым'
      this.showAlertsRegCompany = 'Поля не может быть пустым'
      this.showAlertsInn = 'Поля не может быть пустым'
      this.showAlertsEmail = 'Поля не может быть пустым'
      this.showAlertsPassword = 'Поля не может быть пустым',
      this.showAlertsPhone = 'Поля не может быть пустым'

    } else {
      this.isLoading = true
      this.request.regRequest(registerFormData.name, registerFormData.last_name, registerFormData.middle_name, registerFormData.login, registerFormData.company_name, registerFormData.division, registerFormData.birth_city, registerFormData.regCompany, registerFormData.inn, registerFormData.email, registerFormData.phone, registerFormData.password).subscribe(response => {
        alert('Вы успешно зарегистрировались')
        this.isLoading = false
        this.router.navigate(['/'])
        
      }, error => {
        this.isLoading = false
        alert(error.error)
      })
    }
  }

}
