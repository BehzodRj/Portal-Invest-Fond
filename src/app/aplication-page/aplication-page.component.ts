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
    {name: "MyLot", number_of_lots: '12', discount: "300", NoSsomoni: "2000", NoSdollar: "200", NoSeuro: "180", somoni: "2500", dollar: "250", euro: "230"},
    {name: "MyLot", number_of_lots: '12', discount: "300", NoSsomoni: "2000", NoSdollar: "200", NoSeuro: "180", somoni: "2500", dollar: "250", euro: "230"},
  ]
  showModal = false

  constructor() { }

  ngOnInit() {
    this.addLotsForm = new FormGroup({
      name: new FormControl(''), 
      number_of_lots: new FormControl(''), 
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
  
  send() {
    const addLotsFormData = {...this.addLotsForm.value}
    console.log(addLotsFormData);
    this.addLotsData.push( {name: addLotsFormData.name, number_of_lots: addLotsFormData.number_of_lots, discount: addLotsFormData.discount, NoSsomoni: addLotsFormData.NoSsomoni, NoSdollar: addLotsFormData.NoSdollar, NoSeuro: addLotsFormData.NoSEuro, somoni: addLotsFormData.somoni, dollar: addLotsFormData.dollar, euro: addLotsFormData.euro})
    
  }

}
