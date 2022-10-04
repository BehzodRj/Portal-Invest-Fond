import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  pluss = true
  minuss = false
  allmessages = false
  modalShow = false
  toAnswer = false
  send = false
  AnswerSend = true
 
  constructor(){}
  ngOnInit(){
  }
  close(){
    this.modalShow = false
  }
  plus(){
    this.minuss = true
    this.pluss = false
    this.allmessages = true
  }  
  minus(){
    this.pluss = true
    this.minuss = false
    this.allmessages = false
  }  
  showmodal(){
    this.modalShow = true
  }
  showToAnswer(){
    this.toAnswer = true
    this.send = true
    this.AnswerSend = false
  }
  collapse(){  
    this.toAnswer = false
    this.send = false
    this.AnswerSend = true
  }
  









}