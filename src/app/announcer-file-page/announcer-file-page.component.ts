import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-file-page',
  templateUrl: './announcer-file-page.component.html',
  styleUrls: ['./announcer-file-page.component.scss']
})
export class AnnouncerFilePageComponent implements OnInit {
  pageId!: number
  page: any
  showModal = false
  fileNames = "Файлы"
  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.pageId = params.id 
    })
    this.request.getAnnouncerFiles().subscribe(response => {
      console.log(response)
    }, error => {
      if(error.status == '401') {
        this.request.refreshToken().subscribe( (response: any) =>  {
          localStorage.setItem('access_token', response.access_token)
          location.reload()
        }, errorToken => {
          alert(errorToken.message)
        })
      } else {
        alert(error.message)
      }
    })
  }

  openModal() {
    this.showModal = true
  }
  
  closeModal() {
    this.showModal = false
  }
}
