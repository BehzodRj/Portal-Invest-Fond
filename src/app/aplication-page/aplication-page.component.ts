import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aplication-page',
  templateUrl: './aplication-page.component.html',
  styleUrls: ['./aplication-page.component.scss']
})
export class AplicationPageComponent implements OnInit {
  page: any
  addLotsForm!: FormGroup
  addLotsData: any = [
    {name: "MyLot", numberof_lots: '12', discount: "300", NoSsomoni: "2000", NoSdollar: "200", NoSeuro: "180", somoni: "2500", dollar: "250", euro: "230", partners: 'Первый'},
    {name: "MyLot", numberof_lots: '12', discount: "300", NoSsomoni: "2000", NoSdollar: "200", NoSeuro: "180", somoni: "2500", dollar: "250", euro: "230", partners: 'Второй'},
  ]
  showModal= false

  constructor() { }

  ngOnInit() {
    this.addLotsForm = new FormGroup({
      name: new FormControl(''), 
      numberof_lots: new FormControl(''), 
      discount: new FormControl(''), 
      NoSsomoni: new FormControl(''), 
      NoSdollar: new FormControl(''), 
      NoSeuro: new FormControl(''), 
      somoni: new FormControl(''), 
      dollar: new FormControl(''),
      euro: new FormControl(''),
      partners: new FormControl(''),
    })
  }

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }
}
