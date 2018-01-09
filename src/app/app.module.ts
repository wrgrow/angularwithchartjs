import '../polyfills';
import { HttpClientModule } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup , FormBuilder} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { AngmaterialModule } from './angmaterial.module';
import { DataOptionsComponent } from './data-options/data-options.component';
import { DataCommunicatorService } from './data-options/data-communicator.service';
import { AppRoutingModule } from './app-routing.module';
import { PcmstatusComponent } from './pcmstatus/pcmstatus.component';
import { PcmDataService } from './pcm-data.service';


@NgModule({
  exports: [

  ],
  declarations: [
    ChartComponent,
    AppComponent,
    DataOptionsComponent,
    PcmstatusComponent
  ],
  imports: [
    HttpClientModule,
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      HttpModule,
    ReactiveFormsModule,
    AngmaterialModule,
    AppRoutingModule
    ],

  providers: [DataCommunicatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
