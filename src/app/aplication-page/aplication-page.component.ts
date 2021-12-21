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
  editLotsForm!: FormGroup
  addLotsData: any = []
  editLotsData: any = []
  AddPartnerData:  any = []
  editFormData: any
  status: any
  column = false
  showModal = false
  showEditModal = false
  numId = 2

  constructor(private request: RequestService) { }

  ngOnInit() {
    this.addLotsForm = new FormGroup({
      title: new FormControl(''), 
      lot_number: new FormControl(''), 
      total: new FormControl(''), 
      total_dol: new FormControl(''), 
      total_euro: new FormControl(''), 
      vat: new FormControl(''), 
      vat_dol: new FormControl(''),
      vat_euro: new FormControl(''),
      discount: new FormControl(''), 
      discount_dol: new FormControl(''), 
      discount_euro: new FormControl(''), 
      name: new FormControl(''),
      leader: new FormControl(false),
      Gtotal: new FormControl(''),
      Gtotal_dol: new FormControl(''),
      Gtotal_euro: new FormControl(''),
      Gvat: new FormControl(''),
      Gvat_dol: new FormControl(''),
      Gvat_euro: new FormControl(''),
      Gdiscount: new FormControl(''),
      Gdiscount_dol: new FormControl(''),
      Gdiscount_euro: new FormControl('')
    })

    // EditLotsForm
    this.editLotsForm = new FormGroup({
      title: new FormControl(''), 
      lot_number: new FormControl(''), 
      total: new FormControl(''),
      total_dol: new FormControl(''), 
      total_euro: new FormControl(''), 
      vat: new FormControl(''), 
      vat_dol: new FormControl(''),
      vat_euro: new FormControl(''),
      discount: new FormControl(''), 
      discount_dol: new FormControl(''), 
      discount_euro: new FormControl(''), 
      name: new FormControl(''),
      leader: new FormControl(false),
    })
  }

  addP() {    
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.name == '') {
      alert('Заполните поле')
    } else {
      this.AddPartnerData.push({name: addLotsFormData.name, leader: addLotsFormData.leader})
      this.addLotsForm.controls['name'].reset()
    }
    
  }
  
  deletePartner(index: number) {
  this.AddPartnerData.splice(index, 1)
  }

  save() {
    const addLotsFormData = {...this.addLotsForm.value}
    if(addLotsFormData.title == '' || addLotsFormData.lot_number == '' || addLotsFormData.total == '' || addLotsFormData.vat == '' ||  addLotsFormData.discount == '' ) {
      alert('Заполните поле')
    } else {
      this.addLotsData.push({id: this.numId++, title: addLotsFormData.title, lot_number: addLotsFormData.lot_number, total: addLotsFormData.total, total_dol: addLotsFormData.total_dol, total_euro: addLotsFormData.total_euro, vat: addLotsFormData.vat, vat_dol: addLotsFormData.vat_dol, vat_euro: addLotsFormData.vat_euro, discount: addLotsFormData.discount, discount_dol: addLotsFormData.discount_dol, discount_euro: addLotsFormData.discount_euro, partners: this.AddPartnerData})
      this.editLotsData = this.addLotsData
      this.showModal = false
      this.AddPartnerData = [];
      this.addLotsForm.reset()
    }
  }

  closeEditModal() {
    this.showEditModal = false
  }

  editButton(id: number) {
    this.showEditModal = true
    this.editFormData = this.editLotsData.filter( (res: any) => res.id == id)[0]
    this.editLotsForm.patchValue(this.editFormData)
    this.editLotsForm.controls['name'].reset()
  }

  deleteEdit(index: number) {
    this.editFormData.name.splice(index, 1)
  }

  addEditP() {
    const editLotsFormData = {...this.editLotsForm.value}
    console.log(editLotsFormData);
    if(editLotsFormData.name == '') {
      alert('Заполните поле')
    } else {
      this.editFormData.name.push({name: editLotsFormData.name, leader: editLotsFormData.leader})
      this.editLotsForm.controls['name'].reset()
    }
  }

  cahngeEdit() {
    console.log(this.editFormData);
    
    // let idData = this.addLotsData.filter( (res: any) => res.id == this.editLotsData[0].id)
    // console.log(idData);
  }

  send() {
    const addLotsFormData = {...this.addLotsForm.value}
    this.request.postOrderRequests(
      1,
      addLotsFormData.Gtotal,
      addLotsFormData.Gtotal_dol,
      addLotsFormData.Gtotal_euro,
      addLotsFormData.Gvat,
      addLotsFormData.Gvat_dol,
      addLotsFormData.Gvat_euro,
      addLotsFormData.Gdiscount,
      addLotsFormData.Gdiscount_dol,
      addLotsFormData.Gdiscount_euro,
      this.addLotsData
    ).subscribe(response => {
      console.log(response);
    }, error => {
      alert(error.message)
    })
  }

}
