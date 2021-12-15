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

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getSubsciberProjects().subscribe(response => {
      this.subscriberData = response
    }, error => {
      alert(error.error.message)
    })
  }

}
