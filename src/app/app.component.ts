import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  selectedCounty: string;
  fromDate: Date;
  toDate: Date;

  counties = [
    { value: 'lowndes', viewValue: 'Lowndes' },
    { value: 'tift', viewValue: 'Tift' },
    { value: 'brooks', viewValue: 'Brooks' }
  ];


  countyFormControl = new FormControl('', Validators.required);
  dateFormGroup = new FormGroup({
    'fromDateFormControl': new FormControl('', [Validators.required]),
   'toDateFormControl' : new FormControl('', Validators.required)
  }, this.validateDates);
  matcher = new MyErrorStateMatcher();

  constructor() {

  }

  validateDates(grp: FormGroup) {
    console.log(grp);
    let fromDate: Date;
    let toDate: Date;
    const secondsInADay = 1000 * 60 * 60 * 24;
    let valid = false;
    if (grp.controls['fromDateFormControl'].value && grp.controls['toDateFormControl'].value) {
      fromDate = new Date(grp.controls['fromDateFormControl'].value);
      toDate = new Date(grp.controls['toDateFormControl'].value);
      console.log(fromDate + ' ' + toDate);
      const dateDiff = toDate.getTime() - fromDate.getTime();
      console.log("datediff " + dateDiff);
      console.log("number of days " + (Math.round(dateDiff / secondsInADay) <= 30));
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
    if (this.dateFormGroup.get('fromDateFormControl').dirty &&
      this.dateFormGroup.get('toDateFormControl').dirty &&
      !this.dateFormGroup.valid) {
      return true;
    }
    return false;
}

ngOnInit() {

}

  logData() {
    console.log(this.selectedCounty + " is selectedCounty");
    console.log(this.fromDate + " is fromDate");
    console.log(this.toDate + " is to Date";)
}
}
