import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  socket: any;
  following = [];
  user: any;
  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('https://chat-app-backend-cyowohpgjb.now.sh');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.getUserById();
    this.socket.on('refreshPage', () => {
      this.getUserById();
    });
  }
  getUserById() {
    this.userService.getUserById(this.user._id).subscribe(
      data => {
        this.following = data.result.following;
      },
      err => {
        console.log(err);
      }
    );
  }
  UnfollowUser(user) {
    this.userService.UnfollowUser(user._id).subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }
}
