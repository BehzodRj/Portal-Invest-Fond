import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-edit',
  templateUrl: './announcer-edit.component.html',
  styleUrls: ['./announcer-edit.component.scss']
})
export class AnnouncerEditComponent implements OnInit {
  editAnnouncerData: any
  isLoading = false

  constructor(private router: Router , private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
      this.request.getAnnouncerLots().subscribe(response => {
        this.editAnnouncerData = response
      })
  }

}
