import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {  ToastController} from '@ionic/angular';

const httpOptions = {
  //headers: new HttpHeaders({'Content-Type': 'application/json'})
  //headers: new HttpHeaders({
  //  'Authorization': 'Basic ' + btoa('adminAs:123456'),
  //  'Content-Type': 'application/x-www-form-urlencoded'
  //})
};
//const apiUrl = "http://simsetgis.kendarikota.go.id/api/";
const apiUrl = "http://localhost/simsetgis/api/";

@Injectable({
  providedIn: 'root'
})
export class AsetApiService {

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
  ) { }

  private handleError(error: HttpErrorResponse) {
    let ret = "";
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      ret = error.error.message ;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      ret =`Backend returned code ${error.status}, ` +
      `body was: ${error.error}`;
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(ret);
  }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getAset(id: string, type:string): Observable<any> {
    console.log(''+id+''+type);
    console.log(httpOptions);
    return this.http.get(apiUrl + type + '?id=' + id, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPassword(id: string, password:string): Observable<any> {
    return this.http.get(apiUrl  + 'password?id=' + id +'&password=' + password, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postKondisi(id,type,data,img, kord): Observable<any> {
  const url = `${apiUrl}kondisi_${type}?id=${id}&kondisi=${data.kondisi}&keterangan=${data.keterangan}&image=${img}&kord=${kord}`;
  //this.presentToast(url);
  return this.http.get(url, httpOptions)
    .pipe(
      map(this.extractData),
      catchError(this.handleError)
      );
  }

  getUser(username: string, password:string): Observable<any> {
    return this.http.get(apiUrl + 'user?username=' + username + '&password=' + password, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
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
