import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, of, tap } from 'rxjs';
import { ChannelsService } from 'src/app/services/channels.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';
import { Message } from 'src/models/channel.class';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-channel-add-message',
  templateUrl: './dashboard-channel-add-message.component.html',
  styleUrls: ['./dashboard-channel-add-message.component.sass']
})

export class DashboardChannelAddMessageComponent implements OnInit {

  constructor(private datePipe: DatePipe, private route: ActivatedRoute, public channelService: ChannelsService, private firestore: AngularFirestore, private afAuth: AngularFireAuth,) { }
  textareaFocused = false;
  placeholderText: string;
  newMessage: Message = new Message();
  messageTextInput: string;
  myDate: any = new Date();
  channelId = '';
  channel: Channel = new Channel();


  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('channelId');
      this.getChannel();
    })
  }

  getChannel() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }


  addMessage() {
    let userData = this.getCurrentUser();
    let date = this.getData()
    console.log(date)
    let id = userData[0];
    let userName = userData[1];
    this.newMessage = new Message({
      text: this.messageTextInput,
      time: date,
      userId: id,
      userName: userName
    })
    console.log(this.newMessage);

  }

  getData() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    return this.myDate;
  }

  getCurrentUser() {
    this.afAuth.authState.subscribe(currentUser => {
      if (currentUser) {
        this.firestore
          .collection('users')
          .get()
          .subscribe(snapshot => {
            // Get all the users data from Firestore
            const users: any = snapshot.docs.map(doc => doc.data());

            // Find the current user's data in the users array
            const currentUserData = users.find(user => user.userId === currentUser.uid);

            // Get the properties of the current user
            /*   for (const property in currentUserData) {
  
                console.log(property + ': ' + currentUserData[property]);
              } */
          });
      }
    });
  }


  sendMessage() {
    this.afAuth.authState.subscribe(currentUser => {
      if (currentUser) {
        console.log(currentUser)
      }
    });
  }
}







