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

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getAnnouncerLots().subscribe(response => {
      this.resulData = response
    }, error => {
      alert(error.error)
    })
  }

}
