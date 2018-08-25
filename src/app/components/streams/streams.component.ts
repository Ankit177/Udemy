import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import * as M from 'materialize-css';
@Component({
  selector: 'app-streams',
  templateUrl: './streams.component.html',
  styleUrls: ['./streams.component.css']
})
export class StreamsComponent implements OnInit {
  token: any;
  streamsTab = false;
  topstreamstab = false;
  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    this.streamsTab = true;
    const tabs = document.querySelector('.tabs');
    M.Tabs.init(tabs, {});
    this.token = this.tokenService.getPayLoad();
    console.log(this.token);
  }
  changeTab(stream) {
    if (stream === 'streams') {
      this.streamsTab = true;
      this.topstreamstab = false;
    } else if (stream === 'top') {
      this.streamsTab = false;
      this.topstreamstab = true;
    }
  }
}
