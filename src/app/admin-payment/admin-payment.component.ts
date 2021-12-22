import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss']
})
export class AdminPaymentComponent implements OnInit {
  paymentsData: any = []
  checked = false
  page: any
  showFileModal = false
  dowFile: any = []

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getAdminPayReq().subscribe(response => {
      this.paymentsData = response
    }, error => {
      if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            location.reload()
          }, errorToken => {
            alert(errorToken.message)
          })
        } else {
          alert(error.message)
        }
    })    
  }

  statusChange(items: any, id: any) {
    console.log();
    if(items.target.checked == true) {
      this.request.putAdminPayReq(id, 2).subscribe(response => {
        location.reload()
      }, error => {
         if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            location.reload()
          }, errorToken => {
            alert(errorToken.message)
          })
        } else {
          alert(error.message)
        }
      })
    }
  }

  openModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.split(",").forEach((element:any) => {
          this.dowFile.push( {file: `http://10.251.2.77/${element}`})
        })
    } 
  }

  download(file: any) {
    window.open(file)
  }

  closeModal() {
    this.showFileModal = false
    this.dowFile = []
  }

}
