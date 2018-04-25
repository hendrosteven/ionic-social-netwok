import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Account } from '../../classes/account';
import { AccountService } from '../../services/account-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  account: Account = new Account();

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
      private accountService: AccountService,
      private loadingCtrl: LoadingController,
      private alertCtrl: AlertController) {
  }

  onRegister(){
    let loading = this.loadingCtrl.create({content : 'Please wait..'});
    loading.present();
    this.accountService.register(this.account).subscribe(output => {
      loading.dismiss();
      console.log(output);
      let alert = this.alertCtrl.create({
        title: 'Information',
        subTitle: 'Registration success!',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.pop();
    },error =>{
      loading.dismiss();
      console.log(error);
    });
  }

}
