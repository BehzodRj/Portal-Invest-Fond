import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-file-page',
  templateUrl: './announcer-file-page.component.html',
  styleUrls: ['./announcer-file-page.component.scss']
})
export class AnnouncerFilePageComponent implements OnInit {
  fileForm!: FormGroup
  dowFile: any = []
  fileData: any = []
  projectData: any = []
  setFile: any
  pageId!: number
  page: any
  showModal = false
  fileNames = "Файлы" 
  showFileModal = false
  isLoading = false
  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.fileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
      projects: new FormControl('', Validators.required),
    })

    this.isLoading = true
    this.request.getAnnouncerProjLots().subscribe(response => {
      this.projectData = response
      this.isLoading = false
    })

    this.route.params.subscribe( (params: any) => {
      this.pageId = params.id 
      this.isLoading = true
      this.request.getAnnouncerFiles(params.id).subscribe(response => {
        this.fileData = response
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
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    })
  }

  openAddFileModal() {
    this.showModal = true
  }
  
  closeModal() {
    this.showModal = false
  }
  closeAddFileModal() {
    this.showFileModal = false
  }

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        this.dowFile.push( {file: `https://e-td.investcom.tj/${file}`})
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeFileModal() {
    this.showFileModal = false
    this.dowFile = []
  }

  getFile(elements: any) {
    this.fileNames = elements.target.value.split('\\')[2]
    let reader = new FileReader
    reader.readAsDataURL(elements.target.files[0])
    reader.onload = () => {
      this.setFile = reader.result
      
    }
  }

  sendFiles() {
    const fileFormData = {...this.fileForm.value}
    this.route.params.subscribe( (params: any) =>  {
      this.isLoading = true
      this.request.postAnnouncerFiles(fileFormData.projects, fileFormData.name, this.setFile, params.id).subscribe(response => {
        this.isLoading = false
        location.reload()
      }, error => {
        this.isLoading = false
        alert(error.error)
      })
    })
  }

  deleteFiles(file_id: number) {
    this.isLoading = true
    this.request.deleteAnnouncerFiles(file_id).subscribe(response => {
      this.isLoading = false
      location.reload()
    }, error => {
      this.isLoading = false
      alert(error.error)
    })
  }
}