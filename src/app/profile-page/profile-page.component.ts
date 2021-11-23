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
  userIcon = true
  userImage = false
  showDatas = true
  editDatas = false

  constructor(private request: RequestService) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      division: new FormControl('',),
      company_name: new FormControl(''),
      inn: new FormControl(''),
      email: new FormControl('', Validators.email),
      birth_city: new FormControl(''),
      phone: new FormControl('')
    })

    this.request.getProfileRequest().subscribe(response => {
      console.log(response);
      this.userData = response
    })
  }

  getFilePhoto(image: any) {    
    let reader = new FileReader;
    reader.readAsDataURL(image.target.files[0])
    reader.onload = () => {
      this.getPhoto = reader.result
      this.userIcon = false
      this.userImage = true
    }
  }

  edit() {
    this.showDatas = false
    this.editDatas = true
  }

  change() {
    const editFormData = {...this.editForm.value}
    console.log(editFormData)
    this.showDatas = true
    this.editDatas = false
  }

}
