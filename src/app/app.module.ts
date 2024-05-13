import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LEDControlsComponent } from './led-controls/led-controls.component';
import { FormsModule } from '@angular/forms';
import { AnimationsComponent } from './led-controls/animations/animations.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LedControlsContainerComponent } from './led-controls/led-controls-container/led-controls-container.component';

@NgModule({
  declarations: [
    AppComponent,
    LEDControlsComponent,
    AnimationsComponent,
    HeaderComponent,
    NavigationComponent,
    LedControlsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ColorPickerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
