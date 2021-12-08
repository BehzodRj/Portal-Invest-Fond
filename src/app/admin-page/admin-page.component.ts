import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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
  tableData = [
    {id: '1', name: 'Бехзод', ID: 'BRJKhalif', editShow: true},
    {id: '2', name: 'Мухаммад', ID: 'Muahammad', editShow: true},
    {id: '3', name: 'Сухроб', ID: 'Suhrob', editShow: true},
    {id: '4', name: 'Шоди', ID: 'Shodi', editShow: true},
    {id: '5', name: 'Таня', ID: 'Tanya', editShow: true}
  ]
  pencil = true
  page: any

  constructor(private router: Router) {}

  ngOnInit() {
    this.addForm = new FormGroup({
      addName: new FormControl('')
    })
    

    this.editForm = new FormGroup({
      name: new FormControl(''),
      ID: new FormControl(''),
    })
  }

  addButton() {
    const addFormData = {...this.addForm.value}

    if(addFormData.addName == '') {
      this.addText = 'ПОЛЕ НЕ МОЖЕТ БЫТЬ ПУСТЫМ'
      this.addError = true
    } else {
      console.log(addFormData);
    }
    
  }

  changeButton() {
    const editFormData = {...this.editForm.value}
    console.log(editFormData);
    location.reload()
  }

  adminPro() {
    this.router.navigate(['/adminproject'])
  }

  deleteItem(value: any) {
    const conf = confirm(`Вы хотите удалить ${value}`)
    if(conf == true) {
      this.tableData.shift()
    }
  }

}
