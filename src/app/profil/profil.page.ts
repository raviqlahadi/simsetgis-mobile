import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';


const USER_DATA = 'auth-data';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  userData: any;
  constructor(
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.storage.get(USER_DATA).then(res => {
      if (res) {
        this.userData = JSON.parse(res);
      }
    });
  }

  ngOnInit() {
  }
  changePassword(){

    this.navCtrl.navigateForward(['/change-password']);
  }

  gotoPrivacy(){
    this.navCtrl.navigateForward(['/privacy-policy']);
  }

}
