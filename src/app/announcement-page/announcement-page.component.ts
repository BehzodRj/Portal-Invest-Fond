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
  favId: any
  filName = 'Чек'
  fileData: any
  modalCheck = false
  activeAnounsment = 0
  constructor(private requests: RequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.requests.getSubsciberProjectsID(response.id).subscribe(response => {
        this.anouncement = response
      }, error => {
        alert(error.message)
      })
    })
  }

  modalOpen(id: number) {
    this.modalCheck = true
    this.activeAnounsment = id
  }
  modalSend() {
    this.requests.postAnnouncementCheck( this.activeAnounsment, this.fileData).subscribe(response => {
      this.modalCheck = false
    }, error => {
      alert(error.error.message)
    })
  }

  getFile(value: any) {
    this.filName = value.target.files[0].name
    let reader = new FileReader()
    reader.readAsDataURL(value.target.files[0])
    reader.onload = () => {
      this.fileData = reader.result
    }
    
  }

  download(value: any) {}

  star(favId: any, id:number) {   
    
      if(favId>0){
        this.requests.deleteFavoutitesRequests(id).subscribe(response => {
          location.reload()
        }, error => {
          alert(error.message)
        })
      }
      else{
        this.requests.postFavoutitesRequests(id).subscribe(response => {
        }, error => {
          alert(error.message)
        })
      }
  }
}
