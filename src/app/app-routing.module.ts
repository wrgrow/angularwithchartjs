import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'programcounts', component: ChartComponent },
  { path: 'home', component: AppComponent },
  { path : '' , redirectTo: '/home', pathMatch: 'full'}
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
