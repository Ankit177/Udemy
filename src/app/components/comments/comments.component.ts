import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  socket: any;
  comments = [];
  post: string;
  commentForm: FormGroup;
  toolbarElement: any;
  postId: any;
  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute) {
    this.socket = io('https://chat-app-backend-cyowohpgjb.now.sh');
  }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.toolbarElement.style.display = 'none';

    this.init();
    this.getPost();
    this.socket.on('refreshPage', data => {
      this.getPost();
    });
  }
  init() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  ngAfterViewInit() {}
  addComment() {
    this.postService.addComment(this.postId, this.commentForm.value.comment).subscribe(data => {
      this.commentForm.reset();
      this.socket.emit('refresh', {});
    });
  }
  timeFromNow(time) {
    return moment(time).fromNow();
  }
  getPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.comments = data.post.comments;
      console.log(this.comments);
      this.post = data.post.post;
    });
  }
}
