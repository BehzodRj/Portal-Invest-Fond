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

  openFile(file: any, id: number, status: number) {
      this.request.putAdminPayReq(id, 1).subscribe(response => {
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
