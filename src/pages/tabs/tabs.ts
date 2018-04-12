import { Component } from '@angular/core';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { FeedsPage } from '../feeds/feeds';
import { NotificationPage } from '../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  info = NotificationPage;
  friends = ContactPage;
  feeds = FeedsPage;

  constructor() {

  }
}
