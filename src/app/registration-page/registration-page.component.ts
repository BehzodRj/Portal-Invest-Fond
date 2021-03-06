import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RequestService } from '../all.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  isLoading = false
  registerForm!: any
  changeColor = false
  showAlertsName = "Имя"
  showAlertsLast_name = "Фамилия"
  showAlertsMiddle_name = "Отчество"
  showAlertsCompanyName = "Название компания"
  showAlertsDivision = "Должность"
  showAlertsRegCompany = "Место регистрации 1"
  showAlertsInn = "ИНН"
  showAlertsEmail = "Ваш E-mail"
  showAlertsPhone = "Номер телефона"
  showAlertsPassword = "Пароль"
  showAlertsReturnPassword = "Подтверждение пароля"
  showAlertsCountry = "Страна"
  showAlertsCity = "Город"
  showAlertsPostal = "Почтовый индекс"
  autoCompleteCountryData: any = []
  filteredOptions!: Observable<any[]>;



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
      return_password: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required)
    })

    this.request.getCountryData().subscribe(response => {
      this.autoCompleteCountryData = response
    }, error => {
      alert(error.error)
    })

    
    this.filteredOptions = this.registerForm.controls['country'].valueChanges.pipe(
      startWith(''),
      map( (value: any) => this._filter(value)),
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autoCompleteCountryData.filter( (option: any) => option.name.toLowerCase().includes(filterValue));
  }

  registration() {
    const registerFormData = {...this.registerForm.value}
    if(registerFormData.name == '' || registerFormData.last_name == '' || registerFormData.middle_name == '' || registerFormData.company_name == '' || registerFormData.division == '' || registerFormData.regCompany == '' || registerFormData.inn == '' || registerFormData.email == '' || registerFormData.phone == '' || registerFormData.password == '' || registerFormData.return_password == '' || registerFormData.country == '' || registerFormData.city == '' || registerFormData.postalCode == '') {
      this.showAlertsName = 'Поля не может быть пустым'
      this.showAlertsLast_name = 'Поля не может быть пустым'
      this.showAlertsMiddle_name = 'Поля не может быть пустым'
      this.showAlertsCompanyName = 'Поля не может быть пустым'
      this.showAlertsDivision = 'Поля не может быть пустым'
      this.showAlertsRegCompany = 'Поля не может быть пустым'
      this.showAlertsInn = 'Поля не может быть пустым'
      this.showAlertsEmail = 'Поля не может быть пустым'
      this.showAlertsPassword = 'Поля не может быть пустым',
      this.showAlertsReturnPassword = 'Поля не может быть пустым',
      this.showAlertsPhone = 'Поля не может быть пустым'
      this.showAlertsCountry = 'Поля не может быть пустым'
      this.showAlertsCity = 'Поля не может быть пустым'
      this.showAlertsPostal = 'Поля не может быть пустым'
    } else if(registerFormData.password != registerFormData.return_password) {
      alert('Введенные пароли не совпадают')
    } else {
      this.isLoading = true
      let code =  this.autoCompleteCountryData.filter( (res: any) => res.name == registerFormData.country)
      this.request.regRequest(registerFormData.name, registerFormData.middle_name, registerFormData.last_name, registerFormData.email, registerFormData.password, registerFormData.phone, registerFormData.company_name, code[0].code, registerFormData.city, registerFormData.regCompany1, registerFormData.regCompany2, registerFormData.regCompany3, registerFormData.postalCode, registerFormData.inn, registerFormData.division).subscribe(response => {
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
