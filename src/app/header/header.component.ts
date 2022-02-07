import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  decoded: any
  admin = false
  anouncer = false
  subscriber = false
  shop = false
  docTender = false
  contracts = false
  sogl = false
 
  constructor(private router: Router) { }
  ngOnInit() {
    this.decoded = jwt_decode(`${localStorage.getItem('access_token')}`);

    if(this.decoded.role == 'admin') {
      this.admin = true
    }else if(this.decoded.role == 'anouncer') {
      this.anouncer = true
    }else if(this.decoded.role == 'subscribers') {
      this.subscriber = true
    }
    
  }

  homePage() {
    if(this.decoded.role == 'admin') {
      this.router.navigate(['/admin'])
    }else if(this.decoded.role == 'anouncer') {
      this.router.navigate(['/announcer'])
    }else if(this.decoded.role == 'subscribers') {
      this.router.navigate(['/profile'])
    }
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
 