import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  resultData: any = []
  page: any
  isLoading = false

  constructor(private request: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.isLoading = true
      this.request.getResultReq(params.id).subscribe(response => {
        this.resultData = response
        this.isLoading = false
      }, error => {
        this.isLoading = false
        if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            this.isLoading = false
            location.reload()
            localStorage.clear()
          }, errorToken => {
            this.isLoading = false
            alert(errorToken.message)
            localStorage.clear()
            location.reload()
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    })
  }

}
