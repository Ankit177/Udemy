import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import _ from 'lodash';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  socket: any;
  users = [];
  userArr = [];
  loggedinUser: any;
  onlineLineUser = [];
  constructor(private userService: UsersService, private tokenService: TokenService) {
    this.socket = io('https://chat-app-backend-cyowohpgjb.now.sh');
  }

  ngOnInit() {
    this.loggedinUser = this.tokenService.getPayLoad();
    this.getUsers();
    this.getUserById();
    this.socket.on('refreshPage', () => {
      this.getUsers();
      this.getUserById();
    });
  }
  getUsers() {
    this.userService.getAllUsers().subscribe(data => {
      _.remove(data.result, { username: this.loggedinUser.username });
      this.users = data.result;
      console.log(data);
    });
  }
  getUserById() {
    this.userService.getUserById(this.loggedinUser._id).subscribe(data => {
      this.userArr = data.result.following;
    });
  }
  followUser(user) {
    this.userService.followUser(user._id).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    });
  }
  checkInArray(arr, Id) {
    const result = _.find(arr, ['followedUser._id', Id]);
    if (result) {
      return true;
    } else {
      return false;
    }
  }
  online(event) {
    this.onlineLineUser = event;
  }
  checkIfOnline(name) {
    const result = _.indexOf(this.onlineLineUser, name);
    if (result > -1) {
      return true;
    } else {
      return false;
    }
  }
}
