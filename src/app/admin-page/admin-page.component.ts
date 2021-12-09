import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  addForm!: FormGroup
  addText = 'ДОБАВИТЬ ЦЕНТР'
  text = ''
  addError = false
  editForm!: FormGroup
  tableData: any = []
  editShow: number = 0
  page: any

  constructor(private route: ActivatedRoute, private router: Router, private request: RequestService) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      addName: new FormControl('')
    })
    
    this.editForm = new FormGroup({
      name: new FormControl(''),
    })

    this.request.getAdminReq().subscribe(response => {
      console.log(response); 
      this.tableData = response
    }, error => {
      alert(error.message)
    })
  }
  addButton() {
    const addFormData = {...this.addForm.value}
    if(addFormData.addName == '') {
      this.addText = 'ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ'
      this.addError = true
    } else {
      this.request.postAdminReq(addFormData.addName).subscribe(response => {
        alert("Вы успешно добавили центр")
        location.reload()
      }, error => {
        alert(error.message)
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
    console.log(editFormData);
    this.request.putAdminReq(id, editFormData.name).subscribe(response => {
      location.reload()
    }, error => {
      alert(error.message);
    })
  }
  
  deleteItem(id: number, name: string) {
    const conf = confirm(`Вы хотите удалить центр: ${name}`)
    if(conf == true) {
      this.request.deleteAdminReq(id).subscribe(response => {
        location.reload()
      }, error => {
        alert(error.message)
      })
    }
  }

}
