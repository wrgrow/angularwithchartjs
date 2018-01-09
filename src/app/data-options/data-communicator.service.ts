import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataCommunicatorService {
  public updateService = new BehaviorSubject<any>(null);
  public clicked = this.updateService.asObservable();

  private _fromDate: string;
  private _toDate: string;
  public county: string;
  constructor() { }

  getData() {
    this.updateService.next(null);

  }
  public reset() {
    this._fromDate = '';
    this._toDate = '';
    this.county = '';
  }
  public setfromDate(aDate: Date) {

    this._fromDate = this.getDateStr(aDate);
  }

  public get fromDate(): string
  {
    return this._fromDate;
  }

  public setToDate(aDate: Date) {
    this._toDate = this.getDateStr(aDate);
  }

  public get toDate(): string {
    return this._toDate;
  }

  private getDateStr(aDate: Date) {
    let month: string;
    let day: string;
    let year: string;
    month = (aDate.getMonth() + 1) < 10 ? '0' + (aDate.getMonth() + 1).toString() : (aDate.getMonth() + 1).toString();

    day = aDate.getDate() < 10 ? '0' + aDate.getDate().toString() : aDate.getDate().toString();
    year = aDate.getFullYear().toString();
    return month + day + year;
  }

}
