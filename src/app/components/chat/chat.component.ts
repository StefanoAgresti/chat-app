import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  chatForm!: FormGroup;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}
  chat: any[] = [];
  currentUser: any;

  url: string = 'https://chat-44419-default-rtdb.firebaseio.com/message.json';
  ngOnInit(): void {
    this.chatForm = new FormGroup({
      messageInput: new FormControl('', Validators.required),
    });

    this.currentUser = this.authService.user.displayName;

    this.chatService.getMessage(this.url).subscribe((resMessage: any) => {
      this.chat = Object.keys(resMessage).map((key) => {
        return resMessage[key];
      });
    });
  }

  onSubmit() {
    this.chatService
      .sendMessage(this.url, {
        message: this.chatForm.value.messageInput,
        username: this.authService.user.displayName,
      })
      .subscribe((res) => {
        console.log(res);
      });

    this.chatForm.reset();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
