import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayingFieldComponent } from './playing-field/playing-field.component';
import { SnakeComponent } from './snake/snake.component';
import { AppleComponent } from './apple/apple.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayingFieldComponent,
    SnakeComponent,
    AppleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
