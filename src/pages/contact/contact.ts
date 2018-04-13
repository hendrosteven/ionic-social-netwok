import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Friend } from '../../classes/friend';
import { FriendService } from '../../services/friend-service';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  friends: Friend[] = [];

  constructor(public navCtrl: NavController, private friendService: FriendService, private storage: Storage, private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner) {

  }

  ionViewWillEnter(){
      this.loadFriends();
  }

  loadFriends(){
    let loading = this.loadingCtrl.create({content: 'Please wait..'});
    loading.present();
    this.storage.get('token').then(val =>{
      this.friendService.findAllFriend(val).subscribe(output=>{
        this.friends = output;
        loading.dismiss();
      },error=>{
        loading.dismiss();
        console.log(error);
      })
    });
  }

  scanBarcode(){
    this
    .barcodeScanner
    .scan()
    .then((barcodeData) => {
      let id = Number(barcodeData.text);
      console.log('ID: '+id);
      let loading = this.loadingCtrl.create({content: 'Please wait..'});
      loading.present();
      this.storage.get('token').then(val=>{
        this.friendService.addFriend(id,val).subscribe(output=>{
          loading.dismiss();
          this.loadFriends();
        },error=>{
          loading.dismiss();
          console.log(error);
        });
      })
    }, (err) => {
      console.log(err);
    });
  }

}
