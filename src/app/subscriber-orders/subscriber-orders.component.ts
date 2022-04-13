import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-subscriber-orders',
  templateUrl: './subscriber-orders.component.html',
  styleUrls: ['./subscriber-orders.component.scss']
})
export class SubscriberOrdersComponent implements OnInit {
  orderData: any = []
  page: any
  showfull = true
  isLoading= false

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.isLoading = true
    this.request.getOrderRequests().subscribe(response => {
      this.orderData = response
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
  deleteOrder(id: any) {
    this.isLoading = true
    this.request.deleteAnnouncer(id).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.messages)
    })
  }

}
