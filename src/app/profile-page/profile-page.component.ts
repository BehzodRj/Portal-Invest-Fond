import { Component, OnInit } from '@angular/core';
import { RequestService } from '../all.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


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
  autoCompleteCountryData: any = []
  filteredOptions!: Observable<any[]>;

  constructor(private request: RequestService) { }

  ngOnInit() {

    this.editForm = new FormGroup({
      name: new FormControl(''),
      last_name: new FormControl(''),
      middle_name: new FormControl(''),
      division: new FormControl(''),
      company_name: new FormControl(''),
      inn: new FormControl(''),
      email: new FormControl('', Validators.email),
      address_line1: new FormControl(''),
      address_line2: new FormControl(''),
      address_line3: new FormControl(''),
      phone: new FormControl(''),
      fullname: new FormControl(''),
      town: new FormControl(''),
      postal_code: new FormControl(''),
    })

    this.request.getCountryData().subscribe(response => {
      this.autoCompleteCountryData = response
    }, error => {
      alert(error.error)
    })
    
    this.request.getProfileRequest().subscribe( (response: any) => {
      this.userData = response
      this.editForm.patchValue(response)
      this.editForm.controls['fullname'].patchValue(response.countrie?.name)
    }, error => {
      if(error.status == '401') {
        this.request.refreshToken().subscribe( (response: any) =>  {
          localStorage.setItem('access_token', response.access_token)
        }, errorToken => {
          alert(errorToken.message)
        })
      } else {
        alert(error.message)
      }
    })

    this.filteredOptions = this.editForm.controls['fullname'].valueChanges.pipe(
      startWith(''),
      map( (value: any) => this._filter(value)),
    )
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.autoCompleteCountryData.filter( (option: any) => option.name.toLowerCase().includes(filterValue));
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
    let code =  this.autoCompleteCountryData.filter( (res: any) => res.name == editFormData.fullname)
    this.request.changeProfileData(editFormData.name, editFormData.last_name, editFormData.middle_name, editFormData.division, editFormData.company_name, editFormData.inn, editFormData.email, editFormData.address_line1, editFormData.address_line2, editFormData.address_line3, editFormData.phone, code[0].code, editFormData.town, editFormData.postal_code).subscribe(response => {
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
