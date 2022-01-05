import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  isLoading = false
  editIndex: any
  dowFile: any =[]
  fileName = 'Файл'
  getNewFile: any = []

  constructor(private router: Router, private route: ActivatedRoute, private request: RequestService) { }

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
      is_lead: new FormControl('')
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
      is_lead: new FormControl('')
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
      this.partnersLocalData.push({name: addOrderFormData.partners, is_lead: addOrderFormData.is_lead})
      this.addOrderForm.controls['partners'].reset()
    }
  }

  deleteAddLocalPartners(index: number) {
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
    this.editOrderData = this.orderData[0].lots[index]
    this.editOrderForm.patchValue(this.editOrderData)
    this.editOrderForm.controls['partners'].reset()
    this.editIndex = index
  }

  editLocalPartners() {
    const editOrderFormData = {...this.editOrderForm.value}
    if(editOrderFormData.partners == '') {
      alert('Поле не может быть пустым')
    } else {
      this.editOrderData.partners.push({name: editOrderFormData.partners, is_lead: editOrderFormData.is_lead})
      this.editOrderForm.controls['partners'].reset()
    }
  }

  editLots() {
    this.orderData[0].lots[this.editIndex] = this.editOrderForm.value
    this.orderData[0].lots[this.editIndex].partners = this.editOrderData.partners
    this.editModalShow = false
  }

  deleteEditLocalPartners(index: number) {
    this.editOrderData.partners.splice(index, 1)
  }

  deleteLots(index: number) {
    this.orderData[0].lots.splice(index, 1)    
  }

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.forEach((element:any) => {
          this.dowFile.push( {file: `http://10.251.2.77/${element.name}`, file_id: element.file_id})
        });
    }
  }

  download(file: any) {
    window.open(file)
  }

  deleteFiles(id: number) {
    this.isLoading = true
    this.request.deleteOrderRequests(id).subscribe(response => {
      this.isLoading = false
      alert('Файл успешно удален')
      location.reload()
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
        })
      } else {
        this.isLoading = false
        alert(error.message)
      }
    })
  }

  closeFileModal() {
    this.showFileModal = false
    this.dowFile = []
  }

  newFiles(event: any) {
    this.fileName = event.target.files[0].name
    Object.values(event.target.files).forEach( (element: any) => {
      let reader = new FileReader
      reader.readAsDataURL(element)
      reader.onload = () => {
        this.getNewFile.push(reader.result)
      }
    });
  }

  sendData() {
    const globalOrderFormData = {...this.globalOrderForm.value}
    this.route.params.subscribe( (params: any) => {
      this.isLoading = true
      this.request.putOrderLotsRequests(
        params.id,
        globalOrderFormData.total,
        globalOrderFormData.total_dol,
        globalOrderFormData.total_euro,
        globalOrderFormData.vat,
        globalOrderFormData.vat_dol,
        globalOrderFormData.vat_euro,
        globalOrderFormData.discount,
        globalOrderFormData.discount_dol,
        globalOrderFormData.discount_euro,
        this.orderData[0].lots,
        this.getNewFile).subscribe(response => {
          this.isLoading = false
          alert('Успешно изменен')
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
            })
          } else {
            this.isLoading = false
            alert(error.message)
          }
        })
    })
  }

}