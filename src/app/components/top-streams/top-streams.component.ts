import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { TokenService } from '../../services/token.service';
import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {
  socket: any;
  user: any;
  topPosts = [];
  constructor(private postService: PostService, private tokenService: TokenService, private router: Router) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.AllPosts();
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    });
  }
  AllPosts() {
    this.postService.getAllPost().subscribe(
      data => {
        this.topPosts = data.top;
      },
      err => {
        if (err.error.token === null) {
          this.tokenService.deleteToken();
          this.router.navigate(['/']);
        }
      }
    );
  }
  timeFromNow(time) {
    return moment(time).fromNow();
  }
  likePost(post) {
    this.postService.addLike(post).subscribe(
      data => {
        console.log(data);
        this.socket.emit('refresh', {});
      },
      err => {
        console.log(err);
      }
    );
    console.log(post);
  }
  checkInLikesArray(arr, username) {
    return _.some(arr, { username: username });
  }
  openCommentBox(post) {
    this.router.navigate(['post', post._id]);
  }
}
