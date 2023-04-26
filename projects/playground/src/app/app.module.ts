import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BannedEmailDirective } from './banned-email.directive';
import { UniqueEmailValidator } from './unique-email.directive';
import { ConfirmPasswordValidator } from './confirm-password.directive';
import { ColorPickerComponent } from './color-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    BannedEmailDirective,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
