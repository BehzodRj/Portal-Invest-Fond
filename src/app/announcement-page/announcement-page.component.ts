import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../all.service';

@Component({
  selector: 'app-announcement-page',
  templateUrl: './announcement-page.component.html',
  styleUrls: ['./announcement-page.component.scss']
})
export class AnnouncementPageComponent implements OnInit {
  anouncement: any = [
    {id: '0', tender_owner: 'ТАШКИЛОТЧИИ ТЕНДЕР', lot_name: 'НОМИ ЛОИХА', tender_title: 'МАВЗУИ ТЕНДЕР', deadline: 'МУХЛАТИ ОХИРИ КАБУЛИ ХУЧЧАТХО', description: 'МАТНИ МУФАССАЛ', favourite: false, file: 'BRJ.pdf'},
    {id: '1', tender_owner: 'ТАШКИЛОТЧИИ ТЕНДЕР', lot_name: 'НОМИ ЛОИХА', tender_title: 'МАВЗУИ ТЕНДЕР', deadline: 'МУХЛАТИ ОХИРИ КАБУЛИ ХУЧЧАТХО', description: 'МАТНИ МУФАССАЛ', favourite: false, file: 'BRJ2.pdf'}
  ]
  page: any
  filName = 'Чек'
  modalCheck = false
  constructor(private requests: RequestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.requests.getAnnouncerLots().subscribe(response => {
    //   // this.anouncement = response
    // }, error => {
    //   alert(error.message)
    // })
  }

  modalOpen() {
    this.modalCheck = true
  }
  modalClose() {
    this.modalCheck = false
  }

  getFile(value: any) {
    this.filName = value.target.files[0].name
    
  }

  download(value: any) {}

  star(value: any, id:number) {
    if(value == true) {         
      this.requests.postFavoutitesRequests(id).subscribe(response => {
        console.log(response);
      }, error => {
        value = false
        alert(error.message)
      })
    } else if(value == false) {
      alert('No')
    }
  }
}
