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
 
  constructor(private router: Router) { }
  ngOnInit() {
    this.decoded = jwt_decode(`${localStorage.getItem('access_token')}`);

    if(this.decoded[0][0].role == 'admin') {
      this.admin = true
    }else if(this.decoded[0][0].role == 'anouncer') {
      this.anouncer = true
    }else if(this.decoded[0][0].role == 'subscribers') {
      this.subscriber = true
    }
    
  }

  homePage() {
    if(this.decoded[0][0].role == 'admin') {
      this.router.navigate(['/admin'])
    }else if(this.decoded[0][0].role == 'anouncer') {
      this.router.navigate(['/announcer'])
    }else if(this.decoded[0][0].role == 'subscribers') {
      this.router.navigate(['/profile'])
    }
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
 