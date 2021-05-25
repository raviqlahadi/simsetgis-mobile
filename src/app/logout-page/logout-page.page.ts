import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

const USER_DATA = 'auth-data';
@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.page.html',
  styleUrls: ['./logout-page.page.scss'],
})
export class LogoutPagePage implements OnInit {

  constructor(
    private storage: Storage,
    private router: Router,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.storage.remove(USER_DATA).then(() => {
        this.router.navigateByUrl('/');
      });
    });

   }

  ngOnInit() {
  }

}
