import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';
import { PcmstatusComponent } from './pcmstatus/pcmstatus.component';

const routes: Routes = [
  { path: 'programcounts', component: ChartComponent },
  { path: 'pcmdata', component: PcmstatusComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path : '**' , redirectTo: '/'}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
