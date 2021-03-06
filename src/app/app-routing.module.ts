import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentifiablesComponent } from './identifiables/identifiables.component';
import { PredictComponent } from './predict/predict.component';
import { TrainingComponent } from './training/training.component';

const routes: Routes = [
  {
    path: 'identifiables',
    component: IdentifiablesComponent
  },
  {
    path: 'training',
    component: TrainingComponent
  },
  {
    path: 'predict',
    component: PredictComponent
  },
  {
    path: '',
    redirectTo: '/identifiables',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
