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
      alert(error.error.message)
    })
  }

}
