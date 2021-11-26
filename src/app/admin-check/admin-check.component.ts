import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-check',
  templateUrl: './admin-check.component.html',
  styleUrls: ['./admin-check.component.scss']
})
export class AdminCheckComponent implements OnInit {
  anouncement: any
  page: any

  constructor(private requests: RequestService) {}

  ngOnInit() {
    this.requests.getAnnounceData().subscribe(response => {
      this.anouncement = response
    })
  }

}
