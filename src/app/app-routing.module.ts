import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RgbControlsComponent } from './rgb-controls/rgb-controls.component';

const routes: Routes = [
  {path: 'home', component: RgbControlsComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
