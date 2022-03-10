import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-subscriberorderslot-page',
  templateUrl: './subscriberorderslot-page.component.html',
  styleUrls: ['./subscriberorderslot-page.component.scss']
})
export class SubscriberorderslotPageComponent implements OnInit {
  orderData: any = []
  showFileModal = false
  dowFile: any = []
  isLoading = false

  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.isLoading = true
      this.request.getOrderLotsRequests(params.id).subscribe( (response: any) => {
        this.orderData = response[0]
        this.isLoading = false
      }, error => {
        this.isLoading = false
        if(error.status == '401') {
          this.isLoading = false
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

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.forEach((element:any) => {
          this.dowFile.push( {file: `https://e-td.investcom.tj/${element.path}`})
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
