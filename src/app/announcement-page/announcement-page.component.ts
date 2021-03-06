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
  fileData: any =  []
  dowFile: any = []
  modalCheck = false
  downld = false
  retn = false
  pymnt = false
  isLoading = false
  showFileModal = false
  activeAnounsment = 0
  constructor(private request: RequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(response => {
      this.isLoading = true
      this.request.getSubsciberProjectsID(response.id).subscribe(response => {
        this.anouncement = response
        this.isLoading = false
      }, error => {
        this.isLoading = false
        if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            this.isLoading = false
            location.reload()
          }, errorToken => {
            this.isLoading = false
            alert(errorToken.message)
            localStorage.clear()
            location.reload()
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    })
  }

  modalOpen(id: number) {
    this.modalCheck = true
    this.activeAnounsment = id
  }
  modalSend() {
    if(this.fileData.length < 1) {
      alert('Поле не может быть пустым')
    } else {
      this.isLoading = true
      this.request.postAnnouncementCheck( this.anouncement[this.activeAnounsment].anouncement_id, this.fileData).subscribe(response => {
        this.isLoading = false
        this.modalCheck = false
        location.reload()
        this.anouncement[this.activeAnounsment].status=0;
      }, error => {
        if(error.status == '401') {
          this.isLoading = false
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            this.isLoading = false
            location.reload()
          }, errorToken => {
            this.isLoading = false
            alert(errorToken.message)
            localStorage.clear()
            location.reload()
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    }
  }

  getFile(value: any) {
    this.filName = value.target.files[0].name
      let reader = new FileReader()
      reader.readAsDataURL(value.target.files[0])
      reader.onload = () => {
      this.fileData = reader.result
    }
  }

  openModal(file1: any) {
    if(file1 == '') {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file1.split(",").forEach((element:any) => {
          this.dowFile.push( {name: 'Тендерные документы', file: `https://e-td.investcom.tj/${element}`})
        });
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeModal() {
    this.showFileModal = false
    this.dowFile = []
  }

  openAnnounce(public_file: any) {
    window.open(`https://e-td.investcom.tj/${public_file}`)
  }

  star(favId: any, id:number) { 
      if(favId>0) {
        this.isLoading = true
        this.request.deleteFavoutitesRequests(id).subscribe(response => {
          this.isLoading = false
          location.reload()
        }, error => {
          this.isLoading = false
          if(error.status == '401') {
            this.request.refreshToken().subscribe( (response: any) =>  {
              localStorage.setItem('access_token', response.access_token)
              this.isLoading = false
              location.reload()
            }, errorToken => {
              this.isLoading = false
              alert(errorToken.message)
              localStorage.clear()
              location.reload()
            })
          } else {
            this.isLoading = false
            alert(error.message)
          }
        })
      }
      else{
        this.isLoading = true
        this.request.postFavoutitesRequests(id).subscribe(response => {
          this.isLoading = false
          location.reload()
        }, error => {
          this.isLoading = false
          if(error.status == '401') {
            this.request.refreshToken().subscribe( (response: any) =>  {
              localStorage.setItem('access_token', response.access_token)
              this.isLoading = false
              location.reload()
            }, errorToken => {
              this.isLoading = false
              alert(errorToken.message)
              localStorage.clear()
              location.reload()
            })
          } else {
            this.isLoading = false
            alert(error.message)
          }
        })
      }
  }
}
