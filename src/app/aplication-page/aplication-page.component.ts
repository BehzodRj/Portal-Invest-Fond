import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  AddPartnerForm: any = []
  editFormData: any
  status: any
  column = false
  showModal = false
  showEditModal = false
  numId = 1
  activeEditIndex = 0
  showAlertFile = 'Файл'
  fileData: any = []
  isLoading = false
  checkB = true

  constructor(private request: RequestService, private route: ActivatedRoute, private router: Router) { }

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
      Gtotal: new FormControl(''),
      Gtotal_dol: new FormControl(''),
      Gtotal_euro: new FormControl(''),
      Gvat: new FormControl(''),
      Gvat_dol: new FormControl(''),
      Gvat_euro: new FormControl(''),
      Gdiscount: new FormControl(''),
      Gdiscount_dol: new FormControl(''),
      Gdiscount_euro: new FormControl(''),
      lot_bank: new FormControl(0)
    })

    this.AddPartnerForm = new FormGroup({
      name: new FormControl(''),
      leader: new FormControl(false),
      bank: new FormControl(0)
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
      response_security_submited: new FormControl(false)
    })
  }

  addP() {    
    const AddPartnerFormData = {...this.AddPartnerForm.value}
    if(AddPartnerFormData.name == '') {
      alert('Заполните поле')
    } else {
      this.AddPartnerData.push({name: AddPartnerFormData.name, leader: AddPartnerFormData.leader})
      this.AddPartnerForm.controls['name'].reset()
    }
  }
  
  deletePartner(index: number) {
  this.AddPartnerData.splice(index, 1)
  }

  deleteLots(index: number) {
    this.addLotsData.splice(index, 1)
  }

  save() {
    this.checkB = false
    const addLotsFormData = {...this.addLotsForm.value}
    this.addLotsData.push({id: this.numId++, title: addLotsFormData.title, lot_number: addLotsFormData.lot_number, total: addLotsFormData.total, total_dol: addLotsFormData.total_dol, total_euro: addLotsFormData.total_euro, vat: addLotsFormData.vat, vat_dol: addLotsFormData.vat_dol, vat_euro: addLotsFormData.vat_euro, discount: addLotsFormData.discount, discount_dol: addLotsFormData.discount_dol, discount_euro: addLotsFormData.discount_euro, response_security_submited: addLotsFormData.lot_bank})
    this.editLotsData = this.addLotsData
    this.showModal = false
    this.AddPartnerData = [];
    this.addLotsForm.reset()
  }   

  cahngeEdit() {
    const editLotsFormData = {...this.editLotsForm.value}
    this.addLotsData[this.activeEditIndex] = this.editLotsForm.value
    this.addLotsData[this.activeEditIndex].partners = this.editFormData.partners
    this.showEditModal = false
    if(editLotsFormData.lot_bank == true) {
      this.checkB = false
    } else if(editLotsFormData.lot_bank == false) {
    }
  }

  editButton(id: number) {
    this.showEditModal = true
    this.editFormData = this.editLotsData[id]
    this.editLotsForm.patchValue(this.editFormData)
    this.editLotsForm.controls['name'].reset()
    this.activeEditIndex = id
  }

  getFile(value: any) {
    this.showAlertFile = value.target.files[0].name
    Object.values(value.target.files).forEach( (element: any) => {
      let reader = new FileReader()
      reader.readAsDataURL(element)
      reader.onload = () => {
        this.fileData.push(reader.result)
      }
    })
  }

  send() {
    const addLotsFormData = {...this.addLotsForm.value}
    const AddPartnerFormData = {...this.AddPartnerForm.value}
      this.route.params.subscribe((param: any) => {
        this.isLoading = true
        this.request.postOrderRequests(
          param.id,
          addLotsFormData.Gtotal,
          addLotsFormData.Gtotal_dol,
          addLotsFormData.Gtotal_euro,
          addLotsFormData.Gvat,
          addLotsFormData.Gvat_dol,
          addLotsFormData.Gvat_euro,
          addLotsFormData.Gdiscount,
          addLotsFormData.Gdiscount_dol,
          addLotsFormData.Gdiscount_euro,
          this.addLotsData,
          this.AddPartnerData,
          AddPartnerFormData.bank,
          this.fileData
        ).subscribe(response => {
          this.isLoading = false
          alert("Вы успешно добавили")
          this.router.navigate(['/subscriberorders'])
        }, error => {
          this.isLoading = false
          if(error.status == '401') {
            this.request.refreshToken().subscribe( (response: any) =>  {
              localStorage.setItem('access_token', response.access_token)
              this.isLoading = false
              location.reload()
            }, errorToken => {
              this.isLoading = false
              alert(errorToken.message)
              localStorage.clear()
              location.reload()
            })
          } else {
            this.isLoading = false
            alert(error.message)
          }
        })
      })
    }
}
