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
  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getOrderRequests().subscribe(response => {
      this.orderData = response
      console.log(response); 
    }, error => {
      if(error.status == '401') {
        this.request.refreshToken().subscribe( (response: any) =>  {
          console.log(response);
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
