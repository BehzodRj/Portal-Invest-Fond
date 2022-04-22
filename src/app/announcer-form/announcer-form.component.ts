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
  showFileModal = false
  dowFile: any  = []

  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (response: any) => {
      this.request.getAnnouncerForm(response.id).subscribe(response => {
        this.announcerFormData = response
      }, error => {
        if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            location.reload()
          }, errorToken => {
            alert(errorToken.message)
            localStorage.clear()
            location.reload()
          })
        } else {
          alert(error.message)
        }
      })
    })
  }

  openModal(id: number) {
    this.showModal = true
    this.announcerFormModalData = this.announcerFormData.filter( (res: any) => res.order_id == id )
  }

  closeModal() {
    this.showModal = false
  }

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.forEach((element:any) => {
          this.dowFile.push( {file: `https://e-td.investcom.tj/${element.path}`})
        });
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeFileModal() {
    this.showFileModal = false
    this.dowFile = []
  }
}
