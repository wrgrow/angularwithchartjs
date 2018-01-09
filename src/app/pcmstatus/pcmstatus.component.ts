import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { PCMDatum } from './PcmDatum';
import { PcmDataService } from '../pcm-data.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { CollectionViewer } from '@angular/cdk/collections';
import { DataCommunicatorService } from '../data-options/data-communicator.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-pcmstatus',
  templateUrl: './pcmstatus.component.html',
  providers: [PcmDataService ],
  styleUrls: ['./pcmstatus.component.css']
})

export class PcmstatusComponent implements OnInit, OnDestroy, AfterViewInit {
  matTableDataSourceSubscription: Subscription;
  displayColumns = ['ServiceDate', 'Patient', 'ServiceCode', 'NurseName', 'BillDate', 'BillStatus', 'LastMessage'];
  matTableDataSource = new MatTableDataSource();
   // dataSource = new UserDataSource(this.pcmDataService);
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private pcmDataService: PcmDataService) {
    console.log('pcmstatus constructor called');
    this.pcmDataService.dataCommunicatorService.reset();
    this.matTableDataSourceSubscription = this.pcmDataService.dataBehaviourSubject.asObservable()
      .subscribe(data => this.matTableDataSource.data = data);
  }

  ngOnInit() {

  }


  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.matTableDataSourceSubscription.unsubscribe();
  }

}

export class UserDataSource extends DataSource<any> {

  constructor(private pcmDataService: PcmDataService) {
    super();
  }
  connect(): Observable<PCMDatum[]> {
    return this.pcmDataService.getPCMData();
  }
  disconnect(): void {

  }

}
