import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions}  from '@ionic-native/barcode-scanner/ngx';
import { NavController  } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scannedData: {};
  barcodeScannerOptions: BarcodeScannerOptions;
  scanRes: String;
  constructor(
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private alertController: AlertController
  ){
    this.barcodeScannerOptions = {
      showTorchButton: true,
      showFlipCameraButton: true
    };
  }

  scanCode(){
    this.barcodeScanner.scan()
      .then(barcodeData => {

        this.presentAlert(barcodeData).then(()=>{
          this.scannedData = barcodeData;
          const id = JSON.stringify(barcodeData);
          this.navCtrl.navigateForward(['/detail-aset', { id: id }]);
        });
      }).catch(err => {
        this.scanRes = "error happend= " + err;
      })
  }
  async presentAlert(barcodeData) {
    const alert = await this.alertController.create({
      header: 'Scan Berhasil',
      message: 'Hasil Scan:' + barcodeData.text,
      buttons: ['OK']
    });

    await alert.present();
  }

}
