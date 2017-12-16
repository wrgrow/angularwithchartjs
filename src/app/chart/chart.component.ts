import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ViewChild } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';





declare var Chart: any;

interface ChartData {
  key: string;
  value: number;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {


  @ViewChild('hardWay') hardWay: ElementRef;

  chartObj: any;

  public testing: string;
  private data: ChartData[];
  private chartData: number[] = [];
  private labels = ['IM', 'GL', 'CH', 'FP', 'ST', 'BC', 'CO'];

  @Input()
  public county: string;
  @Input()
  public fromDate: Date;
  @Input()
  public toDate: Date;

  constructor(private http: HttpClient) {
   // this.loadChartData();
  }

  private getDateStr(aDate: Date) {
    let month: string;
    let day: string;
    let year: string;
    month = (aDate.getMonth() + 1).toString();
    day = aDate.getDate().toString();
    year = aDate.getFullYear().toString();
    return month + day + year;

  }

  testData() {
    console.log(this.county + '  ' + this.fromDate + ' ' + this.toDate);
}
  loadChartData() {
    const fullUrl = 'http://localhost:4652/encounters/getsignedclosedencounters';
    let queryStr = '?' + 'county=' + this.county + '&fromDate=' + this.getDateStr(this.fromDate);
    queryStr = queryStr + '&toDate=' + this.getDateStr(this.toDate);
    const urlandquery = fullUrl + queryStr;
    this.chartData = [];


    this.http.get(urlandquery).subscribe(data => {
      this.data = data['data'];
      console.log(data);
      this.labels.forEach(label => {
        let found: ChartData = this.data.find(elem => elem.key == label);

        if (found) {

        this.chartData.push(found.value);
       }
      });

      this.chartObj.data.datasets[0].data = this.chartData;
      this.chartObj.update();


    });
   }

    onChartClick(event) {
      console.log(event);
    }

  ngOnInit() {

  }
  ngAfterViewInit() {
    let ctx: CanvasRenderingContext2D = (<HTMLCanvasElement>this.hardWay.nativeElement).getContext('2d');
    this.chartObj = new Chart( ctx, {
      type: 'bar',
      data: {
          labels: this.labels,
          datasets: [{
              label: 'Closed Encounter Count',
             // data: this.chartData,
              backgroundColor: [
                  'rgba(255, 99, 132, 1.0)',
                  'rgba(54, 162, 235, 1.0)',
                  'rgba(255, 206, 86, 1.0)',
                  'rgba(75, 192, 192, 1.0)',
                  'rgba(153, 102, 255,1.02)',
                  'rgba(255, 159, 64, 1.0)',
          'rgba(128, 0, 0, 1.0)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
          'rgba(128, 0, 0, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display: false
        },
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });


  }


}
