import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavbarChannelsAddDialogComponent } from '../navbar-channels-add-dialog/navbar-channels-add-dialog.component';
import { NavbarMessagesAddDialogComponent } from '../navbar-messages-add-dialog/navbar-messages-add-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/models/channel.class';

interface ChannelNode {
  expandable: boolean;
  channel: string;
  children?: ChannelNode[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  addChannel() { }
  addMessage() { }
  channelId = '';

  constructor(private dialog: MatDialog, private firestore: AngularFirestore) { }

/*    ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.channelId = paramMap.get('id');
      this.getUser();
    })
  }

  getChannels() {
    this.firestore
      .collection('channels')
      .doc(this.channelId)
      .valueChanges()
      .subscribe((channel: any) => {
        this.channel = new Channel(channel);
      })
  }
 
 */

  newChannel() {
    this.dialog.open(NavbarChannelsAddDialogComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }

  newMessage() {
    this.dialog.open(NavbarMessagesAddDialogComponent, {
      width: '520px',
      hasBackdrop: true
    });
  }
}
