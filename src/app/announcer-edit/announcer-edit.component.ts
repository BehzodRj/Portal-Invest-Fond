import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcer-edit',
  templateUrl: './announcer-edit.component.html',
  styleUrls: ['./announcer-edit.component.scss']
})
export class AnnouncerEditComponent implements OnInit {
  editAnnouncerForm!: FormGroup
  editAnnouncerData: any
  editProjectsData: any = []
  getprivateFiles: any = []
  getpublicFiles: any = []
  privateFileName = 'Файл'
  publicFileName = 'Файл'
  isLoading = false

  constructor(private router: Router , private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.editAnnouncerForm = new FormGroup({
      name: new FormControl(''),
      project_center_anouncement_id: new FormControl(''),
      procurement_method: new FormControl(''),
      type_of_procurement: new FormControl(''),
      open_date: new FormControl(''),
      number_of_lots: new FormControl(''),
      price: new FormControl(''),
      privateFiles: new FormControl(''),
      publicFiles: new FormControl(''),
      project: new FormControl(''),
      open_time: new FormControl()
    })
    this.route.params.subscribe( (params: any) => {
      this.isLoading = true
      this.request.getAnnouncerLotsById(params.id).subscribe(response => {
        this.editAnnouncerData = response
        this.editAnnouncerForm.patchValue(this.editAnnouncerData)
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

    this.isLoading = true
    this.request.getAnnouncerProjLots().subscribe(response => {
      this.editProjectsData = response
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
  }

  privateSelectFiles(event: any) {
    this.privateFileName = event.target.files[0].name
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.getprivateFiles = reader.result
      }
  }

  publicSelectFiles(event: any) {
    this.publicFileName = event.target.files[0].name
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = () => {
        this.getpublicFiles = reader.result
      }
  }

  chageEditLots() {
    const editAnnouncerFormData = {...this.editAnnouncerForm.value}
    this.isLoading = true
    this.route.params.subscribe( (params: any) => {
      this.request.putAnnouncerLots(params.id, editAnnouncerFormData.name, editAnnouncerFormData.project_center_anouncement_id, editAnnouncerFormData.procurement_method, editAnnouncerFormData.type_of_procurement, editAnnouncerFormData.open_date, editAnnouncerFormData.number_of_lots, editAnnouncerFormData.price, this.getprivateFiles, this.getpublicFiles, editAnnouncerFormData.project, editAnnouncerFormData.open_time).subscribe(response => {
        this.isLoading = false
        this.router.navigate(['/announcer'])
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
    })
  }
 
}
