import { Component, OnInit } from '@angular/core';
import { AsetApiService } from '../aset-api.service';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';


const USER_DATA = 'auth-data';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {
  formData = {"username":"","password":""};
  userData: any;
  err: String = 'aa';
  constructor(
    private api: AsetApiService,
    private loadingController: LoadingController,
    private storage: Storage,
    private router: Router,
    private plt: Platform
  ) {
      this.plt.ready().then(() => {
        this.checkToken();
      });
   }

  ngOnInit() {
  }

  checkToken() {
    this.storage.get(USER_DATA).then(res => {
      if (res) {
        console.log(res);
        this.router.navigateByUrl('/home');
      }
    })
  }
  postLogin(){
    console.log(this.formData);
  }
  async getData() {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getUser(this.formData.username, this.formData.password)
      .subscribe(res => {
        this.userData = res;
        if(res.status){
          alert("Login Berhasil");
          console.log(res.data[0]);
          return this.storage.set(USER_DATA, JSON.stringify(res.data[0])).then(() => {
            loading.dismiss();
            this.router.navigateByUrl('/home');
          });

        }else{
          this.err = 'Username Atau Password Salah';
          alert(this.err);
          console.log(this.err);
          loading.dismiss();
        }



      }, err => {
        alert('error: ' + err);
        console.log(err);
        loading.dismiss();
        alert(err);
      });
  }

}
