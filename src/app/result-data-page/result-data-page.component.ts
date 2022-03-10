import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-result-data-page',
  templateUrl: './result-data-page.component.html',
  styleUrls: ['./result-data-page.component.scss']
})
export class ResultDataPageComponent implements OnInit {
  resulData: any = []
  page: any
  isLoading = false

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.isLoading = true
    this.request.getAnnouncerLots().subscribe(response => {
      this.resulData = response
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
        })
      } else {
        this.isLoading = false
        alert(error.message)
      }
    })
  }

}
