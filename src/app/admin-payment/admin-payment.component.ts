import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss']
})
export class AdminPaymentComponent implements OnInit {
  checked = false
  page: any

  constructor() { }

  ngOnInit() {}

  check() {
    this.checked = true
  }

}
