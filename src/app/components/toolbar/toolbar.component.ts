import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { Router } from '../../../../node_modules/@angular/router';
import * as M from 'materialize-css';
import { UsersService } from '../../services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  socket: any;
  notifications = [];
  count = [];
  chatList = [];
  msgNum = 0;
  constructor(private tokenservice: TokenService, private router: Router, private userService: UsersService) {
    this.socket = io('http://localhost:3000');
  }
  user: any;
  ngOnInit() {
    const dropdownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElement, {
      alignment: 'right',
      hover: true,
      coverTrigger: false
    });
    const dropdownElementOne = document.querySelectorAll('.dropdown-trigger1');
    M.Dropdown.init(dropdownElementOne, {
      alignment: 'left',
      hover: true,
      coverTrigger: false
    });
    this.user = this.tokenservice.getPayLoad();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }
  logout() {
    this.tokenservice.deleteToken();
    this.router.navigate(['/']);
  }
  goToHome() {
    this.router.navigate(['streams']);
  }
  getUser() {
    this.userService.getUserById(this.user._id).subscribe(
      val => {
        this.notifications = val.result.notifications.reverse();
        this.count = _.filter(this.notifications, ['read', false]);
        this.chatList = val.result.chatList;
        this.checkIfMessageRead(this.chatList);
      },
      err => {
        if (err.error.token === null) {
          this.tokenservice.deleteToken();
          this.router.navigate(['/']);
        }
      }
    );
  }
  timeFromNow(time) {
    return moment(time).fromNow();
  }
  markAllNotification() {
    this.userService.markAllNotificationAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
      console.log(data);
    });
  }
  messageDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    });
  }
  checkIfMessageRead(arr) {
    const checkArr = [];
    for (let i = 0; i < arr.length; i++) {
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length - 1];
      if (this.router.url !== `chat/${receiver.sendername}`) {
        if (receiver.isRead === false && receiver.receivername === this.user.username) {
          checkArr.push(1);
          this.msgNum = _.sum(checkArr);
        }
      }
    }
  }
}
