import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {
  addForm!: any
  placeName = 'ДОБАВИТЬ ПРОЕКТ'
  placeEmail = 'ДОБАВИТЬ EMAIL'
  text = ''
  addError = false
  editForm!: FormGroup
  tableData: any = []
  editShow: number = 0
  page: any
  isLoading = false
  inputColor = false

  constructor(private route: ActivatedRoute, private router: Router, private request: RequestService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      addName: new FormControl('', Validators.required),
      addEmail: new FormControl('', [Validators.required, Validators.email]),
    })
    
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    })

    this.route.params.subscribe(response => {
      this.isLoading = true
      this.request.getAdminProReq(response.id).subscribe(response => {
        this.tableData = response
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
  addButton() {
    const addFormData = {...this.addForm.value}
    if(addFormData.addName == '' || addFormData.addEmail == '') {
      this.placeName = 'ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ'
      this.placeEmail = 'ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ'
      this.addError = true
    } else {
      this.route.params.subscribe(response => {
        this.isLoading = true
        this.request.postAdminProReq(response.id, addFormData.addName, addFormData.addEmail).subscribe(response => {
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
      })
    }
    
  }

  itemClick(id: number){
    this.editShow = id;
    this.inputColor = true
    let patchData = this.tableData.filter( (res: any) => res.project_id == id)[0]
    this.editForm.controls['name'].patchValue(patchData.name)
    this.editForm.controls['email'].patchValue(patchData.user.email)
  }
  
  changeButton(id: number) {
    const editFormData = {...this.editForm.value}
    console.log(editFormData);

    if(editFormData.name == '' || editFormData.email  == '') {
      alert('Поле не может быть пустым')
    } else {
      this.isLoading = true
      this.request.putAdminProReq(id, editFormData.name, editFormData.email).subscribe(response => {
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
  
  deleteItem(id: number, name: string) {
    const conf = confirm(`Вы хотите удалить проект: ${name}`)
    if(conf == true) {
      this.isLoading = true
      this.request.deleteAdminProReq(id).subscribe(response => {
        this.isLoading = false
        location.reload()
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
  
  announcerPage(id: any) {
    this.isLoading = true
    this.request.changePageRequest(id).subscribe( (response: any) => {
      localStorage.setItem('access_token', response.access_token)
      this.isLoading = false
      location.reload()
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