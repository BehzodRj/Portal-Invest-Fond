import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {
  addForm!: FormGroup
  placeName = 'ДОБАВИТЬ ПРОЕКТ'
  placeEmail = 'ДОБАВИТЬ EMAIL'
  text = ''
  addError = false
  editForm!: FormGroup
  tableData: any = []
  editShow: number = 0
  page: any

  constructor(private route: ActivatedRoute, private router: Router, private request: RequestService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      addName: new FormControl(''),
      addEmail: new FormControl(''),
    })
    
    this.editForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
    })

    this.route.params.subscribe(response => {
      this.request.getAdminProReq(response.id).subscribe(response => {
        this.tableData = response
      }, error => {
        alert(error.error.message)
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
        this.request.postAdminProReq(response.id, addFormData.addName, addFormData.addEmail).subscribe(response => {
          location.reload()
      }, error => {
        alert(error.error.message)
      })
      })
    }
    
  }

  itemClick(id: number){
    this.editShow = id;
  }
  
  changeButton(id: number) {
    const editFormData = {...this.editForm.value}
    console.log(editFormData);

    if(editFormData.name == '' || editFormData.email  == '') {
      alert('Поле не может быть пустым')
    } else {
      this.request.putAdminProReq(id, editFormData.name, editFormData.email).subscribe(response => {
        location.reload()    
      }, error => {
        alert(error.error.message)
      })
    }
  }
  
  deleteItem(id: number, name: string) {
    const conf = confirm(`Вы хотите удалить проект: ${name}`)
    if(conf == true) {
      this.request.deleteAdminProReq(id).subscribe(response => {
        location.reload()
      }, error => {
        alert(error.error.message)
      })
    }
  }
}
