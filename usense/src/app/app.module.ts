import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FormPasswordComponent } from './form-password/form-password.component';
import { FormComponent } from './form/form.component';
import { IndicatorsComponent } from './shared/indicators/indicators.component';

@NgModule({
  declarations: [
    AppComponent,
    FormPasswordComponent,
    FormComponent,
    IndicatorsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
