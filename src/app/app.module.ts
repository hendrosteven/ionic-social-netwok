import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FeedsPage } from '../pages/feeds/feeds';
import { AccountPage } from '../pages/account/account';
import { NotificationPage } from '../pages/notification/notification';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { HttpModule } from '@angular/http';
import { AccountService } from '../services/account-service';
import { IonicStorageModule } from '@ionic/storage';
import { PostingPage } from '../pages/posting/posting';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    NotificationPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    FeedsPage,
    LoginPage,
    RegisterPage,
    PostingPage
  ],
  imports: [
  HttpModule,
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{scrollAssist:false,autoFocusAssist:false})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationPage,
    ContactPage,
    HomePage,
    TabsPage,
    AccountPage,
    FeedsPage,
    LoginPage,
    RegisterPage,
    PostingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountService,
    Camera
  ]
})
export class AppModule {}
