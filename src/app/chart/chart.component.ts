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
  // private labels = ['IM', 'GL', 'CH', 'FP', 'ST', 'BC', 'CO'];
  private filterData = ['WI'];
  private max: number;
  @Input() public county: string;
  @Input() public fromDate: Date;
  @Input() public toDate: Date;

  constructor(private http: HttpClient) {
    // this.loadChartData();
  }

  private getDateStr(aDate: Date) {
    let month: string;
    let day: string;
    let year: string;
    month = (aDate.getMonth() + 1).toString();

    day = aDate.getDate() < 10 ? '0' + aDate.getDate().toString() : aDate.getDate().toString();
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
    const datasetData: Array<number> = [];
    const labels: Array<string> = [];

    this.chartData = [];

    const sortChartObjects = function(a: ChartData, b: ChartData) {
      if (a.key.toString().toLowerCase() > b.key.toString().toLowerCase()) {
        return 1;
      } else if (a.key.toString().toLowerCase() < b.key.toString().toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    };
    this.http.get(urlandquery).subscribe(data => {
      this.data = data['data'];
      this.data.sort(sortChartObjects);
      let max = 0;
      for (let i = 0; i < this.data.length; i++) {
        if (!this.filterData.includes(this.data[i].key)) {
          labels.push(this.data[i].key);
          datasetData.push(this.data[i].value);
          if (this.data[i].value > max) {
            max = this.data[i].value;
          }
        }
      }

      this.max = max + 1;
      this.chartObj.destroy();
      this.ngAfterViewInit();
      this.chartObj.data.labels = labels;
      this.chartObj.data.datasets[0].data = datasetData;
      console.log(this.chartObj);
      this.chartObj.update();
    });
  }

  onChartClick(event) {
    console.log(event);
  }

  ngOnInit() {}
  ngAfterViewInit() {
    let ctx: CanvasRenderingContext2D = (<HTMLCanvasElement>this.hardWay.nativeElement).getContext(
      '2d'
    );
    this.chartObj = new Chart(ctx, {
      type: 'bar',
      data: {
        // labels: this.labels,
        datasets: [
          {
            label: 'Closed Encounter Count',
            // data: this.chartData,
            backgroundColor: [
              'rgba(153,0,0,1)',
              'rgba(96,96,96,1)',
              'rgba(0,153,76,1)',
              'rgba(0,153,153,1)',
              'rgba(0,76,153,1)',
              'rgba(0,0,0,1)',
              'rgba(255, 99, 132, 1.0)',
              'rgba(54, 162, 235, 1.0)',
              'rgba(255, 206, 86, 1.0)',
              'rgba(75, 192, 192, 1.0)',
              'rgba(153, 102, 255,1.02)',
              'rgba(255, 159, 64, 1.0)',
              'rgba(128, 0, 0, 1.0)'
            ],
            borderColor: [
              'rgba(153,0,0,1)',
              'rgba(96,96,96,1)',
              'rgba(0,153,76,1)',
              'rgba(0,153,153,1)',
              'rgba(0,76,153,1)',
              'rgba(0,0,0,1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(128, 0, 0, 0.2)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        tooltips: {
          enabled: false
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 1,
          onComplete: function() {
            let chartInstance = this.chart;
            let ctx = chartInstance.ctx;
            ctx.font = Chart.helpers.fontString(
              Chart.defaults.global.defaultFontSize,
              Chart.defaults.global.defaultFontStyle,
              Chart.defaults.global.defaultFontFamily
            );
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            this.data.datasets.forEach(function(dataset, i) {
              const meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function(bar, index) {
                const data = dataset.data[index];
                ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
            });
          }
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: this.max ? this.max : 1
              }
            }
          ]
        }
      }
    });
  }
}
