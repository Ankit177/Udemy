import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { FileUploadModule } from 'ng2-file-upload';
import { StreamsComponent } from '../components/streams/streams.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SideComponent } from '../components/side/side.component';
import { PostFormComponent } from '../components/post-form/post-form.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostService } from '../services/post.service';
import { TokenService } from '../services/token.service';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { CommentsComponent } from '../components/comments/comments.component';
import { RouterModule } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';
import { UsersService } from '../services/users.service';
import { FollowingComponent } from '../components/following/following.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { TopStreamsComponent } from '../components/top-streams/top-streams.component';
import { ChatComponent } from '../components/chat/chat.component';
import { MessageComponent } from '../components/message/message.component';
import { MessageService } from '../services/message.service';
import { EmojiPickerModule } from 'ng2-emoji-picker';
import { ImagesComponent } from '../components/images/images.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    FileUploadModule,
    EmojiPickerModule.forRoot()
  ],
  declarations: [
    StreamsComponent,
    ToolbarComponent,
    SideComponent,
    PostFormComponent,
    PostsComponent,
    CommentsComponent,
    UsersComponent,
    FollowingComponent,
    FollowersComponent,
    NotificationsComponent,
    TopStreamsComponent,
    ChatComponent,
    MessageComponent,
    ImagesComponent
  ],
  exports: [StreamsComponent, ToolbarComponent, SideComponent],
  providers: [PostService, TokenService, UsersService, MessageService]
})
export class StreamsModule {}
