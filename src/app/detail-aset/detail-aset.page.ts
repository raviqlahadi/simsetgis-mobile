import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AsetApiService } from '../aset-api.service';
import { LoadingController } from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Polygon,
  PolygonOptions
//  Environment
} from '@ionic-native/google-maps/ngx';
import { ActivatedRoute } from '@angular/router';
import { NavController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const USER_DATA = 'auth-data';

@Component({
  selector: 'app-detail-aset',
  templateUrl: './detail-aset.page.html',
  styleUrls: ['./detail-aset.page.scss'],
})
export class DetailAsetPage implements OnInit {
  scanData: any;
  map: GoogleMap;
  loading: any;
  scanText: any;
  kib: any;
  asetData: any;
  isDataLoaded: boolean = false;
  error: any;
  userData:any;
  editKondisi: boolean = false;
  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private api: AsetApiService,
    private navCtrl: NavController,
    private storage: Storage,
  ) {
    this.scanData = JSON.parse(this.route.snapshot.paramMap.get('id'));

    if(this.scanData!=null){
      this.scanText = JSON.parse(this.scanData.text);
    }else{
      this.scanText = { "id": "43009", "type":"peralatan"};
    }
    this.kib = this.scanText.type;

  }

  async ngOnInit() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait',
    });
    await this.storage.get(USER_DATA).then(res => {
      if (res) {
        this.userData = JSON.parse(res);
        console.log(this.userData);
      }
    })
    await this.getData();
    //await this.platform.ready();
  }
  async getData() {
    console.log(this.scanText);
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getAset(this.scanText.id, this.scanText.type)
      .subscribe(res => {
        console.log(res);
        this.asetData = res;
        if(this.userData.group_id=='group1000'){
          this.editKondisi = true;
        }
        this.isDataLoaded = true;
        let kordinat = [];
        loading.dismiss();
        if(res.kordinat!==undefined){
          for(let i=0; i<res.kordinat.length;i++){
            kordinat[i] = {
              "lat": parseFloat(res.kordinat[i].lat),
              "lng": parseFloat(res.kordinat[i].lng),
            }
          }
          this.loadMap(kordinat);
        }

      }, err => {
        alert('error: ' + err);
        console.log(err);
        this.error = err;
        this.isDataLoaded = true;
        loading.dismiss();
      });
  }

  kondisiAset(){
    this.navCtrl.navigateForward(['/kondisi-aset', { id: this.scanText.id, type:this.scanText.type }]);
  }

  loadMap(points: any) {
    console.log(points);
    // This code is necessary for browser

  // Environment.setEnv({
    // 'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyC8aB4MpC1orBp300KQQAiVEnWdpry4OPg',
    // 'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyC8aB4MpC1orBp300KQQAiVEnWdpry4OPg'
  // });

    let mapOptions: GoogleMapOptions = {
      camera: {
         target: points[0],
         zoom: 18,
         tilt: 30
       }
    };
    let polygonOptions: PolygonOptions = {
      strokeColor : '#AA00FF',
      strokeWidth: 1,
      points: points
    }
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.addPolygon(polygonOptions).then((polygon: Polygon) => {

    });


  }

}
