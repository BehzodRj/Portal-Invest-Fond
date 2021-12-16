import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-aplication-page',
  templateUrl: './aplication-page.component.html',
  styleUrls: ['./aplication-page.component.scss']
})
export class AplicationPageComponent implements OnInit {
  page: any
  addLotsForm!: FormGroup
  addLotsLocalData: any = []
  AddPartnerData:  any = []
  status: any
  column = false
  showModal = false

  constructor(private request: RequestService) { }

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

  addP() {
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.partners == '') {
      alert('Заполните поле')
    } else {
      this.AddPartnerData.push({partners: addLotsFormData.partners})
    }
    
  }

  check(value: any) {
    
  }
  
  deletePartner() {}

  save() {
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.name == '' || addLotsFormData.numberof_lots == '' ||  addLotsFormData.discount == '' || addLotsFormData.NoSsomoni == '' || addLotsFormData.somoni == '' ) {
      alert('Заполните поле')
    } else {
      this.request.addLotsData.push({name: addLotsFormData.name, numberof_lots: addLotsFormData.numberof_lots, discount: addLotsFormData.discount, NoSsomoni: addLotsFormData.NoSsomoni, NoSdollar: addLotsFormData.NoSdollar, NoSeuro: addLotsFormData.NoSeuro, somoni: addLotsFormData.somoni, dollar: addLotsFormData.dollar, euro: addLotsFormData.euroб, partners: this.AddPartnerData})
      this.addLotsLocalData = this.request.addLotsData
      console.log(this.addLotsLocalData);
      this.showModal = false
    }
  }

  send() {
    console.log(this.request.addLotsData);
  }

}
