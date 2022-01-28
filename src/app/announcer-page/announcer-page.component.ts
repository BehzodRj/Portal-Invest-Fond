import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-page',
  templateUrl: './announcer-page.component.html',
  styleUrls: ['./announcer-page.component.scss']
})
export class AnnouncerPageComponent implements OnInit {
  announcerData: any = []
  page: any
  privateDowFile: any = []
  publicDowFile: any = []
  showFileModal = false
  privateFilesData: any
  publicFilesData: any 

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.request.getAnnouncerLots().subscribe(response => {
      this.announcerData = response
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

  openModal(privateFile: any, publicFile: any) {
    this.privateFilesData = privateFile
    this.publicFilesData = publicFile
    if(privateFile == '' && publicFile == '') {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        this.privateDowFile = `http://10.251.2.77/${privateFile}`
        this.publicDowFile = `http://10.251.2.77/${publicFile}`
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeModal() {
    this.showFileModal = false
  }

  deleteAnnouncer(id: number) {
    this.request.deleteAnnouncerLots(id).subscribe(response => {
      location.reload()
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

}
