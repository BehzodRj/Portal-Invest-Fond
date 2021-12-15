import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aplication-page',
  templateUrl: './aplication-page.component.html',
  styleUrls: ['./aplication-page.component.scss']
})
export class AplicationPageComponent implements OnInit {
  page: any
  showModal= false

  constructor() { }

  ngOnInit() {}

  openModal() {
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }
}
