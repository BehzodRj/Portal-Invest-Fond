import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-file-page',
  templateUrl: './announcer-file-page.component.html',
  styleUrls: ['./announcer-file-page.component.scss']
})
export class AnnouncerFilePageComponent implements OnInit {
  page: any
  showModal = false
  fileNames = "Файлы" 
  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      
    })
  }

  openModal() {
    this.showModal = true
  }
  
  closeModal() {
    this.showModal = false
  }
}
