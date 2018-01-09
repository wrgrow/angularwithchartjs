import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { DataCommunicatorService } from './data-communicator.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    // return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    return !!(control && control.invalid && ( control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-data-options',
  templateUrl: './data-options.component.html',
  styleUrls: ['./data-options.component.css']
})
export class DataOptionsComponent implements OnInit {

  title = 'app';
  selectedCounty: string;
  fromDate: Date;
  toDate: Date;

  counties = [
    { value: 'lowndes', viewValue: 'Lowndes' },
    { value: 'lanier', viewValue: 'Lanier' },
    { value: 'echols', viewValue: 'Echols' },
    { value: 'brooks', viewValue: 'Brooks' },
    { value: 'cook', viewValue: 'Cook' },
    { value: 'tift', viewValue: 'Tift' },
    { value: 'berrien', viewValue: 'Berrien' },
    { value: 'irwin', viewValue: 'Irwin' },
    { value: 'turner', viewValue: 'Turner' },
    { value: 'benhill', viewValue: 'BenHill' }
  ];


  countyFormControl = new FormControl('', Validators.required);
  dateFormGroup = new FormGroup({
    'fromDateFormControl': new FormControl('', [Validators.required]),
   'toDateFormControl' : new FormControl('', Validators.required)
  }, this.validateDates);
  matcher = new MyErrorStateMatcher();

  constructor(private dataCommunicator: DataCommunicatorService) {

  }


  validateDates(grp: FormGroup) {

    let fromDate: Date;
    let toDate: Date;
    const secondsInADay = 1000 * 60 * 60 * 24;
    let valid = false;
    if (!grp.dirty) { return null;}
    if (grp.controls['fromDateFormControl'].value && grp.controls['toDateFormControl'].value) {
      fromDate = new Date(grp.controls['fromDateFormControl'].value);
      toDate = new Date(grp.controls['toDateFormControl'].value);
      const dateDiff = toDate.getTime() - fromDate.getTime();
      if (dateDiff >= 0 && Math.round(dateDiff / secondsInADay) <= 30) {
        valid = true;
      }
    }
    return valid ? null : { 'invalid': true };
}

  isValid() {
    return  this.countyFormControl.valid && this.dateFormGroup.valid;
  }
  checkDates() {
    if (this.dateFormGroup.get('fromDateFormControl').touched &&
      this.dateFormGroup.get('toDateFormControl').touched &&
      !this.dateFormGroup.valid) {
      return true;
    }
    return false;
  }
  clicked() {
    // populate the data
    this.dataCommunicator.setfromDate(this.fromDate);
    this.dataCommunicator.county = this.selectedCounty;
    this.dataCommunicator.setToDate(this.toDate);
    this.dataCommunicator.getData();
}

ngOnInit() {

}

  logData() {
    console.log(this.selectedCounty + ' is selectedCounty');
    console.log(this.fromDate + ' is fromDate');
    console.log(this.toDate + ' is to Date');
}
}
