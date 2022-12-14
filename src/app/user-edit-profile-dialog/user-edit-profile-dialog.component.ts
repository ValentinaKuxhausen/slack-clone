import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-user-edit-profile-dialog',
  templateUrl: './user-edit-profile-dialog.component.html',
  styleUrls: ['./user-edit-profile-dialog.component.sass']
})
export class UserEditProfileDialogComponent {

  user: User = new User();
  userId = '';
  dialog: any;
  firstName: string;
  lastName: string;

  constructor(
    public authService: AuthService,
    private firestore: AngularFirestore,
    private _formBuilder: FormBuilder
    )  { }

    getUser() {
      this.firestore
        .collection('users')
        .doc(this.userId)
        .valueChanges()
        .subscribe((user: any) => {
          this.user = new User(user);
        })
    }

    saveEditedUser(){
      
    }
  
}
