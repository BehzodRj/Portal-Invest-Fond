import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  addForm!: any
  addText = 'ДОБАВИТЬ ЦЕНТР'
  text = ''
  addError = false
  editForm!: FormGroup
  tableData: any = []
  editShow: number = 0
  page: any
  isLoading = false

  constructor(private route: ActivatedRoute, private router: Router, private request: RequestService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      addName: new FormControl('', Validators.required)
    })
    
    this.editForm = new FormGroup({
      name: new FormControl(''),
    })

    this.request.getAdminReq().subscribe(response => {
      this.tableData = response
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
  }
  addButton() {
    const addFormData = {...this.addForm.value}
    if(addFormData.addName == '') {
      this.addText = 'ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ'
      this.addError = true
    } else {
      this.isLoading = true
      this.request.postAdminReq(addFormData.addName).subscribe(response => {
        alert("Вы успешно добавили центр")
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
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    }
    
  }

  itemClick(id: number){
    this.editShow = id;
  }

  adminProject(id: number) {
    this.router.navigate(['/adminproject', id])
  }
  
  changeButton(id: number) {
    const editFormData = {...this.editForm.value}
    if(editFormData.name == '') {
      alert('Поле не может быть пустым')
    } else {
      this.request.putAdminReq(id, editFormData.name).subscribe(response => {
        location.reload()
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
    }
  }
  
  deleteItem(id: number, name: string) {
    const conf = confirm(`Вы хотите удалить центр: ${name}`)
    if(conf == true) {
      this.request.deleteAdminReq(id).subscribe(response => {
        location.reload()
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
    }
  }

}
