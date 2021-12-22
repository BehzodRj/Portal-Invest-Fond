import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-page',
  templateUrl: './announcer-page.component.html',
  styleUrls: ['./announcer-page.component.scss']
})
export class AnnouncerPageComponent implements OnInit {
  annpuncerData: any = []
  page: any

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getAnnouncerLots().subscribe(response => {
      this.annpuncerData = response
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
