import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { RequestService } from '../all.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  adminFilesData: any = []
  decoded: any
  admin = false
  anouncer = false
  subscriber = false
  shop = false
  docTender = false
  contracts = false
  sogl = false
  files: any = [];
 
  constructor(private router: Router, private request: RequestService) {}
  ngOnInit() {
    this.request.getAnnouncerFiles(1).subscribe(response => {
      this.adminFilesData = response
    }, error => {
      alert(error.error)
    })

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

  getData(files:any, type: any){
    this.files = files.filter((file:any) => file.type == type);
  }

  openFile(file: any) {
    window.open(`http://td.investcom.tj/${file}`)
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['/'])
  }

}
 