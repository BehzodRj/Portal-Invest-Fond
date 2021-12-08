import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcer-form',
  templateUrl: './announcer-form.component.html',
  styleUrls: ['./announcer-form.component.scss']
})
export class AnnouncerFormComponent implements OnInit {
  page: any
  showModal= false

  constructor() { }

  ngOnInit() {}

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }
}
