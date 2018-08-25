import { Component, OnInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-auth-tab',
  templateUrl: './auth-tab.component.html',
  styleUrls: ['./auth-tab.component.css']
})
export class AuthTabComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
  }
}
