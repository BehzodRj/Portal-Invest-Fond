import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriber-admin-page',
  templateUrl: './subscriber-admin-page.component.html',
  styleUrls: ['./subscriber-admin-page.component.scss']
})
export class SubscriberAdminPageComponent implements OnInit {
  isLoading = false

  constructor() { }

  ngOnInit(): void {
  }

}
