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
  modalReportFile = false
  showReportFile = false
  reportFileName = 'Файл'
  reportFile: any
  pro_id: any
  reportId: any
  setReportFile: any
  privateFilesData: any
  publicFilesData: any
  date: any = new Date().toISOString()

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
    this.date = this.date.split('T')[0]
  }

  openModal(privateFile: any, publicFile: any) {
    this.privateFilesData = privateFile
    this.publicFilesData = publicFile
    if(privateFile == '' && publicFile == '') {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        this.privateDowFile = `http://td.investcom.tj/${privateFile}`
        this.publicDowFile = `http://td.investcom.tj/${publicFile}`
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeModal() {
    this.showFileModal = false
  }

  deleteAnnouncer(id: number, name: string) {
    let quest = confirm(`Вы хотите удалить ${name}`)
    if(quest == true) {
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

  reports(report: any, id: number,) {
    if(report < 1) {
      this.modalReportFile = true
      this.pro_id = id
    } else if(report) {
      this.showReportFile = true
      this.reportFile = report.path
      this.reportId = report.anouncement_report_id
    }
  }

  getReportFile(elements: any) {
    this.reportFileName = elements.target.files[0].name
    let reader = new FileReader()
    reader.readAsDataURL(elements.target.files[0])
    reader.onload = () => {
      this.setReportFile = reader.result
    }
  }

  modalSend() {
    this.request.postAnnouncerReportFiles(this.pro_id, this.setReportFile).subscribe(response => {
      location.reload()
    }, error => {
      alert(error.error)
    })
  }

  downloadReportFile() {
    console.log(this.reportFile);
    window.open(`http://td.investcom.tj/${this.reportFile}`)
  }

  deleteReportFile() {
    this.request.deleteAnnouncerReportFiles(this.reportId).subscribe(response => {
      location.reload()
    }, error => {
      alert(error.error)
    })
  }

}
