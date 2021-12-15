import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-form',
  templateUrl: './announcer-form.component.html',
  styleUrls: ['./announcer-form.component.scss']
})
export class AnnouncerFormComponent implements OnInit {
  page: any
  showModal= false
  announcerFormData: any
  announcerFormModalData: any

  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (response: any) => {
      this.request.getAnnouncerForm(response.id).subscribe(response => {
        this.announcerFormData = response
      }, error => {
        alert(error.error.Error)
      })
    })
  }

  openModal(id: number) {
    this.showModal = true
    this.request.getAnnouncerFormModal(id).subscribe(response => {
      this.announcerFormModalData = response
    }, error => {
      alert(error.error.Error)
    })
  }

  closeModal() {
    this.showModal = false
  }
}
