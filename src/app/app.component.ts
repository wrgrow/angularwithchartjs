import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  selectedCounty: string;
  fromDate = new Date();
  toDate= new Date();
  counties = [
    { value: 'lowndes', viewValue: 'Lowndes' },
    { value: 'tift', viewValue: 'Tift' },
    { value: 'brooks', viewValue: 'Brooks' }
  ];
  logData() {
    console.log(this.selectedCounty);
    console.log(this.fromDate.getDate());
    console.log(this.fromDate.getFullYear());
}
}
