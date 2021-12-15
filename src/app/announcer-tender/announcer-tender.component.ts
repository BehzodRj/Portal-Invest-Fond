import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-tender',
  templateUrl: './announcer-tender.component.html',
  styleUrls: ['./announcer-tender.component.scss']
})
export class AnnouncerTenderComponent implements OnInit {
  formTender!: FormGroup
  fileData: any = []
  showAlertName = 'Название'
  showAlertCenterID = 'Центр ID'
  showAlertMethod = 'Метод'
  showAlertFile = 'Файл'
  showAlertLots = 'Колличество лотов'
  showAlertPrice = 'Взнос'

  constructor(private router: Router, private request: RequestService) { }

  ngOnInit() {
    this.formTender = new FormGroup({
      name: new FormControl(''),
      centerID: new FormControl(''),
      method: new FormControl(''),
      sendType: new FormControl('однофазный'),
      sendDate: new FormControl(''),
      file: new FormControl(''),
      lots: new FormControl(''),
      price: new FormControl('')
    })
  }

  getFile(value: any) {   
    this.showAlertFile = value.target.files[0].name
    Object.values(value.target.files).forEach( (element: any) => {
      let reader = new FileReader()
      reader.readAsDataURL(element)
      reader.onload = () => {
        this.fileData.push(reader.result)        
      }
    })
    
  }

  send() {
    const formTenderData = {...this.formTender.value}
    if(formTenderData.name == '' || formTenderData.centerID == '' || formTenderData.method == '' || formTenderData.file == '' || formTenderData.lots == '' || formTenderData.price == '') {
      this.showAlertName = 'Поля не может быть пустым'
      this.showAlertCenterID = 'Поля не может быть пустым'
      this.showAlertMethod = 'Поля не может быть пустым'
      this.showAlertFile = 'Поля не может быть пустым'
      this.showAlertLots = 'Поля не может быть пустым'
      this.showAlertPrice = 'Поля не может быть пустым'
    }else if(formTenderData.sendDate == '') {
      alert(' "Дата проведения" не можеть быть пустым')
    } else {
      this.request.postAnnouncerLots(formTenderData.name, formTenderData.centerID, formTenderData.method, formTenderData.sendType, formTenderData.sendDate, formTenderData.lots, formTenderData.price, this.fileData).subscribe(response => {
        alert('Вы успешно добавили тендер')
        this.router.navigate(['/announcer'])
      }, error => {
        alert(error.message)
      })
    }

    
  }

}
