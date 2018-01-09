import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// const baseUrl = 'http://localhost:4652/pcm/getpcminfo';
const baseUrl = 'http://10.205.134.237/getdata/pcm/getpcminfo';
import { PCMDatum } from './pcmstatus/PcmDatum';
import { DataCommunicatorService } from './data-options/data-communicator.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
@Injectable()
export class PcmDataService implements OnDestroy {


  private httpSubscription: Subscription;
  private dataCommunicatorSubscription: Subscription;
  public dataBehaviourSubject: BehaviorSubject<PCMDatum[]> = new BehaviorSubject<PCMDatum[]>([]);

  constructor(private httpClient: HttpClient, public dataCommunicatorService: DataCommunicatorService) {
    this.dataCommunicatorService.reset();
    this.dataCommunicatorSubscription = dataCommunicatorService.clicked.subscribe(() => {
      if (this.dataCommunicatorService.county && this.dataCommunicatorService.fromDate && this.dataCommunicatorService.toDate) {
        this.updatePCMData();
      }
    } );
  }
   getPCMData(): Observable<PCMDatum[]> {
     return this.dataBehaviourSubject.asObservable();
 }
  updatePCMData(): void {
    console.log('updatePCMDataCalled');
    let qryStr = baseUrl;
    qryStr += '?county=' + this.dataCommunicatorService.county + '&';
    qryStr += 'beginDate=' + this.dataCommunicatorService.fromDate + '&';
    qryStr += 'endDate=' + this.dataCommunicatorService.toDate;
     this.httpSubscription = this.httpClient.get<PCMDatum[]>(qryStr).subscribe(data => {
      this.dataBehaviourSubject.next(data);
    }
    );

  }

  ngOnDestroy(): void {
    if (this.httpSubscription) {
      this.httpSubscription.unsubscribe();
    }
    this.dataCommunicatorSubscription.unsubscribe();
  }

}

