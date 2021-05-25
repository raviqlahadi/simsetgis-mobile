# simsetgis-mobile
Mobile App for scanning qrcode, take picture, plotting and updating BMD data for BPKAD Kota Kendari 

### Requirement
- Node: v14.xx
- npm: v6.xx.xx
- Angular-cli: v7.2.4
- Android SDK 

### Instalation
after clonning the repository, go to project directory folder and run 

    npm install

it will be download nessesary modules for the project.

### Run android
For local testing, make sure **Simsetgis web app** is running and the device is in same network and change the api url in file `scr\app\aset-api.service.ts` use the server IP. 
Make sure there is device attached or an emulator is running. Can check it by run `adb devices` in command line, then run:

    ionic cordova run android

for more instruction read the [documentation](https://ionicframework.com/docs/cli/commands/cordova-run).

### Production Build
- For release build read this [documentation](https://ionicframework.com/docs/cli/commands/cordova-build).
- For google play release use this [instruction](https://ionicframework.com/docs/v3/intro/deploying/).
