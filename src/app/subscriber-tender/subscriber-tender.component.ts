import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-subscriber-tender',
  templateUrl: './subscriber-tender.component.html',
  styleUrls: ['./subscriber-tender.component.scss']
})
export class SubscriberTenderComponent implements OnInit {
  subscriberData: any
  page: any

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getSubsciberProjects().subscribe(response => {
      this.subscriberData = response
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
