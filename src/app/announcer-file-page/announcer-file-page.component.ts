import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-file-page',
  templateUrl: './announcer-file-page.component.html',
  styleUrls: ['./announcer-file-page.component.scss']
})
export class AnnouncerFilePageComponent implements OnInit {
  page: any
  showModal = false
  title = 'Файлы' 
  constructor(private request: RequestService) { }

  ngOnInit() {}

  openModal() {
    this.showModal = true
  }
  
  closeModal() {
    this.showModal = false
  }
}
