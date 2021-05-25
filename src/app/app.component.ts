import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
const USER_DATA = 'auth-data';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profil',
      url: '/profil',
      icon: 'person'
    },

    {
      title: 'Detail',
      url: '/detail-aset',
      icon: 'information'
    },
    {
      title: 'Tentang',
      url: '/tentang',
      icon: 'information'
    },
    
    {
        title: 'Keluar',
        url: '/logout-page',
        icon: 'log-out'
      }
  ];

  userData:any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
  ) {


    this.storage.get(USER_DATA).then(res => {
      if (res) {
        console.log(JSON.parse(res));
        this.userData = JSON.parse(res);
      }else{
        this.router.navigateByUrl('/login-page');
      }
    }).then(() =>{
      this.initializeApp();
    })

  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
