import { FlatTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NavbarChannelsAddDialogComponent } from '../navbar-channels-add-dialog/navbar-channels-add-dialog.component';
import { NavbarMessagesAddDialogComponent } from '../navbar-messages-add-dialog/navbar-messages-add-dialog.component';

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


  constructor(private dialog: MatDialog) { }




  newChannel() {
    this.dialog.open(NavbarChannelsAddDialogComponent, {
      width: '400px',
      hasBackdrop: true
    });
  }

  newMessage() {
    this.dialog.open(NavbarMessagesAddDialogComponent, {
      width: '400px',
      hasBackdrop: true
    });
  }
}
