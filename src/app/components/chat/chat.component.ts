import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  onlineUser = [];
  tabElement: any;
  constructor() {}

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }
  ngAfterViewInit() {
    this.tabElement.style.display = 'none';
  }
  online(event) {
    this.onlineUser = event;
  }
}
