import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import {Md5} from 'ts-md5/dist/md5';
import { AsetApiService } from '../aset-api.service';
import { Router } from '@angular/router';

const USER_DATA = 'auth-data';
const md5 = new Md5();

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
formData = {"old":"","new":""};
userData: any;
constructor(
  private api: AsetApiService,
  private storage: Storage,
  private navCtrl: NavController,
  private loadingController: LoadingController,
  private toastController: ToastController,
  private router: Router
) {

}
  ngOnInit() {
    this.storage.get(USER_DATA).then(res => {
      if (res) {
        this.userData = JSON.parse(res);
      }
    }).then(() =>{
      console.log(this.userData);
    })

  }
  getData(){


    const newPwd = this.formData.new;
    const old = this.formData.old;
    const pwd = this.userData.password;
    if(newPwd==null){
      this.presentToast('Password baru tidak boleh kosong');
    }else if(old==null){
      this.presentToast('Password lama tidak boleh kosong');
    }else{
      if(Md5.hashStr(old)==pwd){
        this.updateData(newPwd);
      //  this.presentToast('Password lama benar');
      }else{
        this.presentToast('Password lama salah');
      }
    }

  }

  async updateData(password) {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getPassword(this.userData.userid, password)
      .subscribe(res => {
        this.userData = res;
        if(res.status){
          this.userData.password = password;
          console.log(res);
          return this.storage.set(USER_DATA, JSON.stringify(this.userData)).then(() => {
            loading.dismiss();
            this.presentToast('Password telah terganti');
            this.router.navigateByUrl('/profil');
          });
        }else{
          this.presentToast('Password telah terganti');
          loading.dismiss();
        }

      }, err => {
        alert('error: ' + err);
        console.log(err);
        loading.dismiss();
        alert(err);
      });
  }
  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

}
