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
  isLoading = false
  dowFile: any = []

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.isLoading = true
    this.request.getAdminPayReq().subscribe(response => {
      this.paymentsData = response
      this.isLoading = false
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
            localStorage.clear()
          })
        } else {
          this.isLoading = false
          alert(error.message)
          localStorage.clear()
        }
    })    
  }

  statusChange(items: any, id: any) {
    console.log();
    if(items.target.checked == true) {
      this.isLoading = true
      this.request.putAdminPayReq(id, 2).subscribe(response => {
        this.isLoading = false
        location.reload()
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

  openModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.split(",").forEach((element:any) => {
          this.dowFile.push( {file: `https://e-td.investcom.tj/${element}`})
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
