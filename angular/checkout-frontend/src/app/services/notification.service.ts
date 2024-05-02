import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public _showSpinner = false;

  constructor() { }

  showSpinner() {
    this._showSpinner = true;
    return this._showSpinner;
  }

  hideSpinner() {
    this._showSpinner = false;
    return this._showSpinner;
  }

  isSpinner() {
    return this._showSpinner;
  }
}
