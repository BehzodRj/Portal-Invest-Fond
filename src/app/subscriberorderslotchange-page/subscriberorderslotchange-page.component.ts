import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-subscriberorderslotchange-page',
  templateUrl: './subscriberorderslotchange-page.component.html',
  styleUrls: ['./subscriberorderslotchange-page.component.scss']
})
export class SubscriberorderslotchangePageComponent implements OnInit {
  globalOrderForm!: FormGroup
  addOrderForm!: FormGroup
  editOrderForm!: FormGroup
  orderData: any = []
  editOrderData: any
  partnersLocalData: any = []
  creatModalShow = false
  editModalShow = false
  showFileModal = false
  dowFile: any = []

  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.addOrderForm = new FormGroup({
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
      partners: new FormControl(''),
      leader: new FormControl('')
    })

    this.editOrderForm = new FormGroup({
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
      partners: new FormControl(''),
      leader: new FormControl('')
    })

    this.globalOrderForm = new FormGroup({
      total: new FormControl(''),
      total_dol: new FormControl(''),
      total_euro: new FormControl(''),
      vat: new FormControl(''),
      vat_dol: new FormControl(''),
      vat_euro: new FormControl(''),
      discount: new FormControl(''),
      discount_dol: new FormControl(''),
      discount_euro: new FormControl('')
    })

    this.route.params.subscribe( (params: any) => {
      this.request.getOrderLotsRequests(params.id).subscribe( (response: any) => {
        this.orderData.push(response)
        this.globalOrderForm.patchValue(this.orderData[0])
      }, error => {
        if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            location.reload()
          }, errorToken => {
            alert(errorToken.message)
          })
        } else {
          alert(error.message)
        }
      })
    })
  }

  addLocalPartners() {
    const addOrderFormData = {...this.addOrderForm.value}
    if(addOrderFormData.partners == '') {
      alert('Поле не может быть пустым')
    } else {
      this.partnersLocalData.push({name: addOrderFormData.partners, is_lead: addOrderFormData.leader})
      this.addOrderForm.controls['partners'].reset()
    }
  }

  deleteLocalPartners(index: number) {
    this.partnersLocalData.splice(index, 1)
  }

  addLot() {
    const addOrderFormData = {...this.addOrderForm.value}
    if(addOrderFormData.title == '' || addOrderFormData.lot_number == '' || addOrderFormData.total == '' || addOrderFormData.vat == '') {
      alert('Поле не может быть пустым')
    } else {
      this.orderData[0].lots.push({title: addOrderFormData.title, lot_number: addOrderFormData.lot_number, total: addOrderFormData.total, total_dol: addOrderFormData.total_dol, total_euro: addOrderFormData.total_euro, vat: addOrderFormData.vat, vat_dol: addOrderFormData.vat_dol, vat_euro: addOrderFormData.vat_euro, discount: addOrderFormData.discount, discount_dol: addOrderFormData.discount_dol, discount_euro: addOrderFormData.discount_euro, partners: this.partnersLocalData})
      this.addOrderForm.reset()
      this.creatModalShow = false
    }
  }

  openEditModal(index: number) {
    this.editModalShow = true
    console.log(this.orderData[0].lots[index]);
    this.editOrderData = this.orderData[0].lots[index]
    this.editOrderForm.patchValue(this.editOrderData)
  }

  deleteLots(index: number) {
    this.orderData[0].lots.splice(index, 1)    
  }

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.split(",").forEach((element:any) => {
          this.dowFile.push( {file: `http://10.251.2.77/${element}`})
        });
    }
  }

  download(file: any) {
    window.open(file)
  }

  closeFileModal() {
    this.showFileModal = false
    this.dowFile = []
  }

}
