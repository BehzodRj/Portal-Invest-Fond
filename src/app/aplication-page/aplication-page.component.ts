import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-aplication-page',
  templateUrl: './aplication-page.component.html',
  styleUrls: ['./aplication-page.component.scss']
})
export class AplicationPageComponent implements OnInit {
  formApl!: any
  fileName!: string
  show = true

  constructor() {}

  ngOnInit() {
    this.formApl = new FormGroup({
      number: new FormControl(''),
      name: new FormControl(''),
      summa: new FormControl(''),
      lots: new FormArray([])
    })
  }

  getFileName(value: any) {
    this.fileName = value.target.files[0].name
    this.show = false
    console.log(value.target.files);
  }

  add() {
    (this.formApl.get('lots') as FormArray).push(new FormGroup( {number: new FormControl(''), name: new FormControl(''), summa: new FormControl('')} ))
  }

  deleted(idx: any) {
    (this.formApl.get('lots') as FormArray).removeAt(idx)
  }

  send() {
    const formAplData = {...this.formApl.value}
    console.log(formAplData);
  }

}
