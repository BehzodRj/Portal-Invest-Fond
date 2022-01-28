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

  constructor(private request: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.request.getResultReq(11).subscribe(response => {
        this.resultData = response
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
    })
  }

}
