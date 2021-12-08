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
      console.log(response);
    })
  }

}
