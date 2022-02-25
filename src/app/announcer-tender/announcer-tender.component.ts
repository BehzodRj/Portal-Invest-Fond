import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-tender',
  templateUrl: './announcer-tender.component.html',
  styleUrls: ['./announcer-tender.component.scss']
})
export class AnnouncerTenderComponent implements OnInit {
  formTender!: any
  fileData: any = []
  publicFileData: any = []
  projectsData: any = []
  showAlertName = 'Название'
  showAlertCenterID = 'Номер пакета'
  showAlertMethod = 'Метод'
  showAlertFile = 'Файл'
  showAlertPublicFile = 'Файл'
  showAlertLots = 'Колличество лотов'
  showAlertPrice = 'Стоимость тендерного документа'
  isLoading = false

  constructor(private router: Router, private request: RequestService) { }

  ngOnInit() {
    this.formTender = new FormGroup({
      name: new FormControl('', Validators.required),
      centerID: new FormControl('', Validators.required),
      method: new FormControl('', Validators.required),
      sendType: new FormControl('одноэтапный', Validators.required),
      sendDate: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      publicFile: new FormControl('', Validators.required),
      lots: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      project: new FormControl('', Validators.required),
      open_time: new FormControl('9:00')
    })

    this.request.getAnnouncerProjLots().subscribe(response => {
      this.projectsData = response
    }, error => {
      alert(error.message)
    })
  }

  getFile(value: any) {
    this.showAlertFile = value.target.files[0].name
    let reader = new FileReader()
    reader.readAsDataURL(value.target.files[0])
    reader.onload = () => {
      this.fileData = reader.result
      console.log(reader.result);
      
    }
  }

  getPublicFile(value: any) {
    this.showAlertPublicFile = value.target.files[0].name
    let reader = new FileReader()
    reader.readAsDataURL(value.target.files[0])
    reader.onload = () => {
      this.publicFileData = reader.result
    }
  }

  send() {
    const formTenderData = {...this.formTender.value}
    this.isLoading = true
    this.request.postAnnouncerLots(formTenderData.name, formTenderData.centerID, formTenderData.method, formTenderData.sendType, formTenderData.sendDate, formTenderData.lots, formTenderData.price, this.fileData, this.publicFileData, formTenderData.project, formTenderData.open_time).subscribe(response => {
      this.isLoading = false
      alert('Вы успешно добавили тендер')
      this.router.navigate(['/announcer'])
    }, error => {
      this.isLoading = false
      if(error.status == '401') {
        this.request.refreshToken().subscribe( (response: any) =>  {
          localStorage.setItem('access_token', response.access_token)
          this.isLoading = false
          location.reload()
        }, errorToken => {
          this.isLoading = false
          alert(errorToken.message)
        })
      } else {
        this.isLoading = false
        alert(error.message)
      }
    })

    
  }
}
