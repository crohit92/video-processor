import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdentifiablesComponent } from './identifiables/identifiables.component';
import { TrainingComponent } from './training/training.component';
import { PredictComponent } from './predict/predict.component';

@NgModule({
  declarations: [
    AppComponent,
    IdentifiablesComponent,
    TrainingComponent,
    PredictComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
