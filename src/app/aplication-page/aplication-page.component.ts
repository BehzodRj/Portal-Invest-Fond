import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aplication-page',
  templateUrl: './aplication-page.component.html',
  styleUrls: ['./aplication-page.component.scss']
})
export class AplicationPageComponent implements OnInit {
  lots = [{"name": ""}]

  constructor() { }

  ngOnInit(): void {
  }

  add() {
    this.lots.push({"name": "" + this.lots.length})
    console.log(this.lots);
    
  }

  deleted() {
    this.lots.shift()
  }

}
