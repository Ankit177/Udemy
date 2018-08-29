import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  socket: any;
  user: any;
  notifications = [];
  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('https://chat-app-backend-cyowohpgjb.now.sh');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.getUser();
    this.socket.on('refreshPage', () => {
      this.getUser();
    });
  }
  getUser() {
    this.userService.getUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
      console.log(data);
    });
  }
  timeFromNow(time) {
    return moment(time).fromNow();
  }
  markAsRead(data) {
    this.userService.MarkNotification(data._id).subscribe(val => {
      this.socket.emit('refresh', {});
      console.log(val);
    });
  }
  deleteNotification(data) {
    this.userService.MarkNotification(data._id, true).subscribe(val => {
      this.socket.emit('refresh', {});
    });
  }
}
