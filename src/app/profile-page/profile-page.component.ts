import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  editForm!: FormGroup
  userData: any = []
  getPhoto: any
  anouncement: any
  page: any
  // userIcon = true
  // userImage = false
  showDatas = true
  editDatas = false
  isLoading = false

  constructor(private request: RequestService) { }

  ngOnInit() {
    
    this.request.getProfileRequest().subscribe(response => {
      this.userData = response

      this.editForm = new FormGroup({
        name: new FormControl(this.userData.name),
        last_name: new FormControl(this.userData.last_name),
        middle_name: new FormControl(this.userData.middle_name),
        division: new FormControl(this.userData.division),
        company_name: new FormControl(this.userData.company_name),
        inn: new FormControl(this.userData.inn),
        email: new FormControl(this.userData.email, Validators.email),
        regCompany1: new FormControl(this.userData.address_line1),
        regCompany2: new FormControl(this.userData.address_line2),
        regCompany3: new FormControl(this.userData.address_line3),
        phone: new FormControl(this.userData.phone),
        country: new FormControl(this.userData.company_country),
        city: new FormControl(this.userData.town),
        postalCode: new FormControl(this.userData.postal_code),
      })
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

  // getFilePhoto(image: any) { 
  //   let reader = new FileReader;
  //   reader.readAsDataURL(image.target.files[0])
  //   reader.onload = () => {
  //     console.log(reader.result);
      
  //     this.request.postPhotoProfile(localStorage.getItem('user'), reader.result).subscribe(response => {
  //       console.log(response);
  //       this.getPhoto = reader.result
  //       this.userIcon = false
  //       this.userImage = true
  //     }, error => {
  //       alert(error.message)
        
  //     })
  //   }
  // }

  edit() {
    this.showDatas = false
    this.editDatas = true
  }

  change() {
    const editFormData = {...this.editForm.value}
    this.isLoading = true
    this.request.changeProfileData(editFormData.name, editFormData.last_name, editFormData.middle_name, editFormData.division, editFormData.company_name, editFormData.inn, editFormData.email, editFormData.regCompany1, editFormData.regCompany2, editFormData.regCompany3, editFormData.phone, editFormData.country, editFormData.city, editFormData.postalCode).subscribe(response => {
      this.isLoading = false
      location.reload()
      this.showDatas = true
      this.editDatas = false
    },  error => {
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
  }

}
