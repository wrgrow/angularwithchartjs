import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class DataCommunicatorService {
  public updateService = new BehaviorSubject<any>(null);
  public clicked = this.updateService.asObservable();

  public fromDate: Date;
  public toDate: Date;
  public county: string;
  constructor() { }

  getData() {
    this.updateService.next(null);
    console.log('getData was called');
  }

}
