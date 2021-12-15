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
  checkStatus = false
  page: any

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getAdminPayReq().subscribe(response => {
      this.paymentsData = response
    }, error => {
      alert(error.error.message)  
    })    
  }

  changeStatus(value: any, status: number) {
    console.log(status);
    
    if(status >= 1) {
      this.checkStatus = true
      value.target.checked = true
    } else if(status < 1) {
      this.checked = true
    }
  }

  openFile(file: any) {
    let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(reader.result);
        this.checked = true
      }
  }

}
