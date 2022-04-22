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
  isLoading = false

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.isLoading = true
    this.request.getAnnouncerLots().subscribe(response => {
      this.announcerData = response
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
    this.date = this.date.split('T')[0]
  }

  openModal(privateFile: any, publicFile: any) {
    this.privateFilesData = privateFile
    this.publicFilesData = publicFile
    if(privateFile == '' && publicFile == '') {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        this.privateDowFile = `https://e-td.investcom.tj/${publicFile}`
        this.publicDowFile = `https://e-td.investcom.tj/${privateFile}`
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
      this.isLoading = true
      this.request.deleteAnnouncerLots(id).subscribe(response => {
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
    this.isLoading = true
    this.request.postAnnouncerReportFiles(this.pro_id, this.setReportFile).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error)
    })
  }

  downloadReportFile() {
    console.log(this.reportFile);
    window.open(`https://e-td.investcom.tj/${this.reportFile}`)
  }

  deleteReportFile() {
    this.isLoading = true
    this.request.deleteAnnouncerReportFiles(this.reportId).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error)
    })
  }

}
