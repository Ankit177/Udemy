import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit {
  socket: any;
  receiver: string;
  receiverData: any;
  user: any;
  message: string;
  messages = [];
  typingMessage;
  typing = false;
  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.user = this.tokenService.getPayLoad();
    this.route.params.subscribe(params => {
      this.receiver = params.name;
      this.getUserByUsername(this.receiver);
      this.socket.on('refreshPage', () => {
        this.getUserByUsername(this.receiver);
      });
    });
    this.socket.on('isTyping', data => {
      if (data.sender === this.receiver) {
        this.typing = true;
      }
    });
    this.socket.on('has_stopped_typing', data => {
      if (data.sender === this.receiver) {
        this.typing = false;
      }
    });
  }
  ngAfterViewInit() {
    console.log('after view init');
    const params = {
      room1: this.user.username,
      room2: this.receiver
    };
    console.log(params);

    this.socket.emit('join chat', params);
  }
  getUserByUsername(name) {
    this.userService.getUserByName(name).subscribe(data => {
      this.receiverData = data.result;
      this.getAllMessages(this.user._id, data.result._id);
    });
  }
  sendMessage() {
    if (this.message) {
      this.messageService
        .sendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message)
        .subscribe(res => {
          this.socket.emit('refresh', {});
          this.message = '';
        });
    }
  }
  getAllMessages(sender, receiver) {
    this.messageService.GetAllMessages(sender, receiver).subscribe(data => {
      this.messages = data.messages.message;
      console.log(this.messages);
    });
  }
  isTyping() {
    this.socket.emit('start typing', {
      sender: this.user.username,
      receiver: this.receiver
    });
    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }
    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiver
      });
    }, 500);
  }
}
