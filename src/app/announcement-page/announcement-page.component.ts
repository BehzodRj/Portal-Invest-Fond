import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './announcement-page.component.html',
  styleUrls: ['./announcement-page.component.scss']
})
export class AnnouncementPageComponent implements OnInit {
  colorChange = false

  constructor() { }

  ngOnInit(): void {
  }

}
