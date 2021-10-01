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

  ngOnInit(): void {
    if(this.showCheckboxes0==true){
      this.showCheckboxes1 = false
      this.showCheckboxes2 = false
      this.showCheckboxes3 = false
      this.showCheckboxes4 = false
      this.showCheckboxes5 = false
      this.showCheckboxes6 = false
      this.showCheckboxes7 = false
      this.showCheckboxes8 = false 
      this.showCheckboxes9 = false
    }else{
      this.showCheckboxes0 = true
      this.showCheckboxes1 = true
      this.showCheckboxes2 = true
      this.showCheckboxes3 = true
      this.showCheckboxes4 = true
      this.showCheckboxes5 = true
      this.showCheckboxes6 = true
      this.showCheckboxes7 = true 
      
    }

    
  } 
}
