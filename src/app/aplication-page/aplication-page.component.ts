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
  
  save() {
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.name == '' || addLotsFormData.numberof_lots == '' ||  addLotsFormData.discount == '' || addLotsFormData.NoSsomoni == '' || addLotsFormData.somoni == '' ) {
      alert('Заполните поле')
    } else {
      this.request.addLotsData.push({name: addLotsFormData.name, numberof_lots: addLotsFormData.numberof_lots, discount: addLotsFormData.discount, NoSsomoni: addLotsFormData.NoSsomoni, NoSdollar: addLotsFormData.NoSdollar, NoSeuro: addLotsFormData.NoSeuro, somoni: addLotsFormData.somoni, dollar: addLotsFormData.dollar, euro: addLotsFormData.euro})
      this.addLotsLocalData = this.request.addLotsData
      this.showModal = false
      console.log(this.addLotsForm)
    }
  }

  addP() {
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.partners == '') {
      alert('Заполните поле')
    } else {
      this.request.addPartners.push( {partners: addLotsFormData.partners, status: true} )
      this.AddPartnerData = this.request.addPartners
      this.addLotsForm.controls['partners'].reset()
      if(this.AddPartnerData.length == 5) {
        this.column = true
      }
      console.log(this.request.addPartners);
      
      
    }
    
  }

  check(value: any) {  
    const addLotsFormData = {...this.addLotsForm.value}
    if(value.target.checked == true) {
      this.request.addPartners.push( {partners: addLotsFormData.partners, status: false} )
    } else if(value.target.checked == false) {
      this.request.addPartners.push( {partners: addLotsFormData.partners, status: true} )
    }
  }
  
  deletePartner() {
    this.request.addPartners.shift()
  }

  send() {
    console.log(this.request.addLotsData);
    console.log(this.request.addPartners);
  }

}
