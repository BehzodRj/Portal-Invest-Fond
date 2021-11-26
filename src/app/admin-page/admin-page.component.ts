import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  editForm!: FormGroup
  tableData = [
    {id: '1', name: 'Бехзод', login: 'BRJKhalif', pass: 'behzod', editShow: true},
    {id: '2', name: 'Мухаммад', login: 'Muahammad', pass: 'muhammad', editShow: true},
    {id: '3', name: 'Сухроб', login: 'Suhrob', pass: 'suhrob', editShow: true},
    {id: '4', name: 'Шоди', login: 'Shodi', pass: 'shodi', editShow: true},
    {id: '5', name: 'Таня', login: 'Tanya', pass: 'tanya', editShow: true}
  ]
  pencil = true
  page: any

  constructor() {}

  ngOnInit() {
    this.editForm = new FormGroup({
      name: new FormControl(''),
      login: new FormControl(''),
      pass: new FormControl('')
    })
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
