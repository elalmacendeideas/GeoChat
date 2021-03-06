import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddChatPage } from '../add-chat/add-chat';
import { HomePage } from '../home/home';
import * as firebase from 'Firebase';

@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  rooms = [];
  ref = firebase.database().ref('chatrooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }


  addRoom() {
    this.navCtrl.push(AddChatPage);
  }

  joinRoom(key) {
  this.navCtrl.setRoot(HomePage, {
    key:key,
    nickname:this.navParams.get("nickname")
    });
  }

}


  export const snapshotToArray = snapshot => {
      let returnArr = [];

      snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;
          returnArr.push(item);
      });

      return returnArr;
  };
