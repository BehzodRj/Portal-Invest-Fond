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

  constructor(private route: ActivatedRoute, private request: RequestService) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.request.getOrderLotsRequests(params.id).subscribe(response => {
        this.orderData = response
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

  openFileModal(file: any) {
    if(file < 1) {
      alert('Нет никаких файлов для скачивания')
    } else {
        this.showFileModal = true
        file.forEach((element:any) => {
          this.dowFile.push( {file: `http://10.251.2.77/${element.name}`})
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
