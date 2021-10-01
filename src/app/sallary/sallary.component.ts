import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sallary',
  templateUrl: './sallary.component.html',
  styleUrls: ['./sallary.component.scss']
})
export class SallaryComponent implements OnInit {
  showCheckboxes0 = false
  showCheckboxes1 = false
  showCheckboxes2 = false
  showCheckboxes3 = false
  showCheckboxes4 = false
  showCheckboxes5 = false
  showCheckboxes6 = false
  showCheckboxes7 = false
  showCheckboxes8 = false
  showCheckboxes9 = false

  constructor() { }

  ngOnInit(): void {}

  showCheckboxesZero() {
    this.showCheckboxes0 = !this.showCheckboxes0
    if(this.showCheckboxes0 == true) {
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesFirst() {
    this.showCheckboxes1 = !this.showCheckboxes1
    if(this.showCheckboxes1 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesSec() {
    this.showCheckboxes2 = !this.showCheckboxes2
    if(this.showCheckboxes2 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesThird() {
    this.showCheckboxes3 = !this.showCheckboxes3
    if(this.showCheckboxes3 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesFourth() {
    this.showCheckboxes4 = !this.showCheckboxes4
    if(this.showCheckboxes4 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesFifth() {
    this.showCheckboxes5 = !this.showCheckboxes5
    if(this.showCheckboxes5 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesSix() {
    this.showCheckboxes6 = !this.showCheckboxes6
    if(this.showCheckboxes6 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesSeven() {
    this.showCheckboxes7 = !this.showCheckboxes7
    if(this.showCheckboxes7 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes8 = false
      this.showCheckboxes9 = false
    }
  }

  showCheckboxesEight() {
    this.showCheckboxes8 = !this.showCheckboxes8
    if(this.showCheckboxes8 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes9 = false
    }
    
  }

  showCheckboxesNine() {
    this.showCheckboxes9 = !this.showCheckboxes9
    if(this.showCheckboxes9 == true) {
      this.showCheckboxes0 = false
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false
    }
    
  }

  
}

