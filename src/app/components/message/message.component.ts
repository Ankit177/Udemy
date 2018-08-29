import { Component, OnInit, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { MessageService } from '../../services/message.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import io from 'socket.io-client';
import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';
import _ from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, AfterViewInit, OnChanges {
  @Input()
  users: any;
  online_users = [];
  socket: any;
  receiver: string;
  receiverData: any;
  user: any;
  message: string;
  messages = [];
  typingMessage;
  typing = false;
  public eventMock;
  public eventPosMock;
  isOnline = false;

  public direction =
    Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : Math.random() > 0.5 ? 'right' : 'left';
  public toggled = false;
  content = '';

  _lastCaretEvent: CaretEvent = new CaretEvent({});
  constructor(
    private tokenService: TokenService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.socket = io('https://chat-app-backend-cyowohpgjb.now.sh');
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
  ngOnChanges(changes: SimpleChanges) {
    if (changes.users.currentValue.length > 0) {
      const result = _.indexOf(changes.users.currentValue, this.receiver);
      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    }
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
  HandleSelection(event: EmojiEvent) {
    this.content =
      this.content.slice(0, this._lastCaretEvent.caretOffset) +
      event.char +
      this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);
    this.message = this.content;
    this.toggled = !this.toggled;
    this.content = '';
  }

  HandleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${
      event.textContent
    } }`;
  }
  toggleEmoji() {
    this.toggled = !this.toggled;
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
