import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Posting } from '../../classes/posting';
import { PostingService } from '../../services/posting-service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-posting',
  templateUrl: 'posting.html',
})
export class PostingPage {

  base64Image: string  = '';
  posting: Posting = new Posting();

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private viewCtrl: ViewController,
      public dom: DomSanitizer,
      private loadingCtrl: LoadingController,
      private postingSerice: PostingService,
      private storage: Storage) {
  }

  ionViewDidLoad() {
    this.base64Image = this.navParams.get('picture');
    this.posting.photo = this.base64Image;
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  onPosting(){
    let loading = this.loadingCtrl.create({content: 'Please wait..'});
    loading.present();
    this.storage.get('token').then(val => {
        console.log(val);
        this.postingSerice.savePosting(this.posting,val).subscribe(output => {
          console.log(output);
          loading.dismiss();
          this.viewCtrl.dismiss(output[0]);
        },error=>{
          loading.dismiss();
          console.log(error);
        });
    })
    
  }

}
