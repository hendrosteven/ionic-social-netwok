import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-posting',
  templateUrl: 'posting.html',
})
export class PostingPage {

  base64Image: string  = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.base64Image = this.navParams.data;
    console.log(this.base64Image);
  }

}
