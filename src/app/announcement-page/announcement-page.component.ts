import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './announcement-page.component.html',
  styleUrls: ['./announcement-page.component.scss']
})
export class AnnouncementPageComponent implements OnInit {
  anouncement: any
  page: any
  constructor(private requests: RequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.requests.getAnnounceData().subscribe(response => {
      this.anouncement = response
    })
  }

}
