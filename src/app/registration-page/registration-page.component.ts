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
  registerForm!: any
  showAlertsName = "Имя"
  showAlertsLast_name = "Фамилия"
  showAlertsMiddle_name = "Отчество"
  showAlertsCompanyName = "Наименование компании"
  showAlertsDivision = "Должность"
  showAlertsRegCompany = "Место регистрация 1"
  showAlertsInn = "ИНН"
  showAlertsEmail = "Ваш E-mail"
  showAlertsPhone = "Номер телефона"
  showAlertsPassword = "Пароль"
  showAlertsCountry = "Страна"
  showAlertsCity = "Город"
  showAlertsPostal = "Почтовый индекс"


  constructor(private request: RequestService, private router: Router) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      middle_name: new FormControl('', Validators.required),
      company_name: new FormControl('', Validators.required),
      division: new FormControl('', Validators.required),
      regCompany1: new FormControl('', Validators.required),
      regCompany2: new FormControl('', Validators.required),
      regCompany3: new FormControl('', Validators.required),
      inn: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    })
  }

  registration() {
    const registerFormData = {...this.registerForm.value}
    if(registerFormData.name == '' || registerFormData.last_name == '' || registerFormData.middle_name == '' || registerFormData.company_name == '' || registerFormData.division == '' || registerFormData.regCompany == '' || registerFormData.inn == '' || registerFormData.email == '' || registerFormData.phone == '' || registerFormData.password == '' || registerFormData.country == '' || registerFormData.city == '' || registerFormData.postalCode == '') {
      this.showAlertsName = 'Поля не может быть пустым'
      this.showAlertsLast_name = 'Поля не может быть пустым'
      this.showAlertsMiddle_name = 'Поля не может быть пустым'
      this.showAlertsCompanyName = 'Поля не может быть пустым'
      this.showAlertsDivision = 'Поля не может быть пустым'
      this.showAlertsRegCompany = 'Поля не может быть пустым'
      this.showAlertsInn = 'Поля не может быть пустым'
      this.showAlertsEmail = 'Поля не может быть пустым'
      this.showAlertsPassword = 'Поля не может быть пустым',
      this.showAlertsPhone = 'Поля не может быть пустым'
      this.showAlertsCountry = 'Поля не может быть пустым'
      this.showAlertsCity = 'Поля не может быть пустым'
      this.showAlertsPostal = 'Поля не может быть пустым'
    } else {
      this.isLoading = true
      this.request.regRequest(registerFormData.name, registerFormData.middle_name, registerFormData.last_name, registerFormData.email, registerFormData.password, registerFormData.phone, registerFormData.company_name, registerFormData.country, registerFormData.city, registerFormData.regCompany1, registerFormData.regCompany2, registerFormData.regCompany3, registerFormData.postalCode, registerFormData.inn, registerFormData.division).subscribe(response => {
        this.isLoading = false
        alert('Вы успешно зарегистрировались')
        this.router.navigate(['/'])
      }, error => {
        this.isLoading = false
        alert(error.error)
      })
    }
  }
}
