import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AsetApiService } from '../aset-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { NavController  } from '@ionic/angular';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderReverseResult } from '@ionic-native/native-geocoder/ngx';


import { finalize } from 'rxjs/operators';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-kondisi-aset',
  templateUrl: './kondisi-aset.page.html',
  styleUrls: ['./kondisi-aset.page.scss'],
})
export class KondisiAsetPage implements OnInit {

  kordinat: any;
  formData:any = {};
  id: any;
  type: any;
  images = [];
  imgName: any;

  geoencoderOptions: NativeGeocoderOptions = {
   useLocale: true,
   maxResults: 5
 };

  constructor(public api: AsetApiService,
  private navCtrl: NavController,
  private route: ActivatedRoute,
  public router: Router,
  private camera: Camera,
  private file: File,
  private http: HttpClient,
  private webview: WebView,
  private actionSheetController: ActionSheetController,
  private toastController: ToastController,
  private storage: Storage,
  private plt: Platform,
  private loadingController: LoadingController,
  private ref: ChangeDetectorRef,
  private filePath: FilePath,
  private geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder

  ) {

    this.formData.kondisi = null;
    this.formData.keterangan = null;

  }

  async postKondisi(){
    let id = this.route.snapshot.paramMap.get('id');
    let type = this.route.snapshot.paramMap.get('type');
    let kord = this.kordinat;
    console.log(id);
    console.log(type);
    console.log(this.formData);
    await this.api.postKondisi(id, type, this.formData, this.imgName, kord)
    .subscribe(res => {
        if(res){
          this.presentToast('Kondisi Berhasil Di Update');
          this.navCtrl.navigateBack('/home');

        }else{
          alert('Terjadi Kesalahan');
        }
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  getGeolocation(){
      this.geolocation.getCurrentPosition().then((resp) => {
        this.kordinat = `${resp.coords.latitude}, ${resp.coords.longitude}`;
        return this.kordinat;
       }).catch((error) => {
         alert('Error getting location'+ JSON.stringify(error));
       });
    }



  ngOnInit() {
    this.getGeolocation();
  }

  loadStoredImages() {
    this.storage.get(STORAGE_KEY).then(images => {
      if (images) {
        let arr = JSON.parse(images);
        this.images = [];
        for (let img of arr) {
          let filePath = this.file.dataDirectory + img;
          let resPath = this.pathForImage(filePath);
          this.images.push({ name: img, path: resPath, filePath: filePath });
        }
      }
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async presentToast(text) {
    const toast = await this.toastController.create({
        message: text,
        position: 'bottom',
        duration: 3000
    });
    toast.present();
  }

  async selectImage() {
      const actionSheet = await this.actionSheetController.create({
          header: "Select Image source",
          buttons: [
            
            {
                  text: 'Ambil dari gallery',
                  handler: () => {
                      this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                  }
              },
              {
                  text: 'Gunakan Kamera',
                  handler: () => {
                      //this.deleteImage();
                      this.takePicture(this.camera.PictureSourceType.CAMERA);
                  }
              },
              {
                  text: 'Cancel',
                  role: 'cancel'
              }
          ]
      });
      await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
      var options: CameraOptions = {
          quality: 40,
          sourceType: sourceType,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          targetWidth: 800,
          targetHeight: 800
      };

      this.camera.getPicture(options).then(imagePath => {
            if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
              this.filePath.resolveNativePath(imagePath)
                  .then(filePath => {
                      let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                      let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                  });
          } else {
              var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
              var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
              this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          }
      });

  }

  createFileName() {
    var d = new Date(),
        n = d.getTime(),
        newFileName = n + ".jpg";
    this.imgName = newFileName;

    return newFileName;
}

  copyFileToLocalDir(namePath, currentName, newFileName) {
      this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
          this.updateStoredImages(newFileName);
      }, error => {
          this.presentToast('Error while storing file.');
      });
  }

  updateStoredImages(name) {
      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          if (!arr) {
              let newImages = [name];
              this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
          } else {
              arr.push(name);
              this.storage.set(STORAGE_KEY, JSON.stringify(arr));
          }

          let filePath = this.file.dataDirectory + name;
          let resPath = this.pathForImage(filePath);

          let newEntry = {
              name: name,
              path: resPath,
              filePath: filePath
          };

          this.images = [newEntry, ...this.images];
          this.ref.detectChanges(); // trigger change detection cycle
      });
  }

  deleteImage() {
      this.images = [];

      this.storage.get(STORAGE_KEY).then(images => {
          let arr = JSON.parse(images);
          for(let i=0;i<arr.length;i++){
            let imgEntry = arr[i];
            var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);
            this.file.removeFile(correctPath, imgEntry.name);
          }
          let filtered = [];
          this.storage.set(STORAGE_KEY, JSON.stringify(filtered));


          this.presentToast('File removed.');

      });
  }

  startUpload(imgEntry) {
      this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
          .then(entry => {
              ( < FileEntry > entry).file(file => this.readFile(file))
          })
          .catch(err => {
              this.presentToast('Error while reading file.');
          });
  }

  readFile(file: any) {
      const reader = new FileReader();
      reader.onloadend = () => {
          const formData = new FormData();
          const imgBlob = new Blob([reader.result], {
              type: file.type
          });
          formData.append('file', imgBlob, file.name);
          this.uploadImageData(formData);
      };
      reader.readAsArrayBuffer(file);
  }

  async uploadImageData(formData: FormData) {
      const loading = await this.loadingController.create({
          message: 'Uploading image',
      });
      await loading.present();
      let type = this.route.snapshot.paramMap.get('type');
      this.http.post("http://simsetgis.kendarikota.go.id/api_post?type=" + type, formData)
          .pipe(
              finalize(() => {
                  loading.dismiss();
              })
          )
          .subscribe(res => {
              if (res['success']) {
                  //this.presentToast('File upload complete.');
                  this.postKondisi();

              } else {
                  this.presentToast('File upload failed.' + res['message'] )
              }
          });
  }


}
