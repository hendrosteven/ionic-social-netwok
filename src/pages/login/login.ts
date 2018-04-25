import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Login } from '../../classes/login';
import { AccountService } from '../../services/account-service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: Login = new Login();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private accountService: AccountService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private storage: Storage) {
  }

  doLogin(){
    let loading = this.loadingCtrl.create({content: "Please wait.."});
    loading.present();
    this.accountService.prosesLogin(this.login).subscribe(output =>{
      console.log(output);
      if(output.result == 1){
        //token disimpan di storage
        this.storage.set("token",output.token);
        loading.dismiss();
        this.navCtrl.setRoot(TabsPage);
      }else{
        loading.dismiss();
        this.handleMessage('Login Fail',output.message);
      }
    },error => {
      loading.dismiss();
      this.handleMessage('Error', error);
    })
  }

  onRegsiter(){
    this.navCtrl.push(RegisterPage);
  }

  handleMessage(title: string, message: string){
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
