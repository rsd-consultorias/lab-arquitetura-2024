import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public _showSpinner = false;
  private timeOut?: any;

  constructor() { }

  showSpinner() {
    this.timeOut = setTimeout(() => {
      this.hideSpinner();
    }, 5000);
    this._showSpinner = true;
    return this._showSpinner;
  }

  hideSpinner() {
    this._showSpinner = false;
    clearTimeout(this.timeOut!);
    return this._showSpinner;
  }

  isSpinner() {
    return this._showSpinner;
  }
}
