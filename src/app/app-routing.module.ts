import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LEDControlsComponent } from './led-controls/led-controls.component';
import { LedControlsContainerComponent } from './led-controls/led-controls-container/led-controls-container.component';

const routes: Routes = [
  {path: 'home', component: LedControlsContainerComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
