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
  isLoading = false

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.isLoading = true
    this.request.getSubsciberProjects().subscribe(response => {
      this.isLoading = false
      this.subscriberData = response
    }, error => {
      if(error.status == '401') {
        this.isLoading = false
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

}
