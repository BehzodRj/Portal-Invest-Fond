import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {
  addForm!: FormGroup
  addText = 'ДОБАВИТЬ ПРОЕКТ'
  text = ''
  addError = false
  editForm!: FormGroup
  tableData = [
    {id: '1', name: 'Бехзод', ID: 'BRJKhalif', pass: "1234567", editShow: true},
    {id: '2', name: 'Мухаммад', ID: 'Muahammad', pass: "1234567", editShow: true},
    {id: '3', name: 'Сухроб', ID: 'Suhrob', pass: "1234567", editShow: true},
    {id: '4', name: 'Шоди', ID: 'Shodi', pass: "1234567", editShow: true},
    {id: '5', name: 'Таня', ID: 'Tanya', pass: "1234567", editShow: true}
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
      email: new FormControl(''),
      pass: new FormControl(''),
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

  deleteItem(value: any) {
    const conf = confirm(`Вы хотите удалить ${value}`)
    if(conf == true) {
      this.tableData.shift()
    }
  }
}
