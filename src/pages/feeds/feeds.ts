import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AccountService } from '../../services/account-service';
import { Account } from '../../classes/account';
import { QrcodePage } from '../qrcode/qrcode';

@Component({
  selector: 'page-feeds',
  templateUrl: 'feeds.html',
})
export class FeedsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private app: App, private accountService: AccountService) {
  }


  logout(){
    this.storage.remove('token').then(()=>{
      this.app.getRootNav().setRoot(LoginPage);
    });
  }

  createQrCode(){
    this.storage.get('token').then(val=>{
      this.accountService.loadAccount(val).subscribe((account: Account) =>{
        this.navCtrl.push(QrcodePage, account.id.toString());
      })
    });
  }

}
