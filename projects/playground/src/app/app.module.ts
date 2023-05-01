import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InscriptionComponent } from './inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannedEmailDirective } from './banned-email.directive';
import { UniqueEmailValidator } from './unique-email.directive';
import { ConfirmPasswordValidator } from './confirm-password.directive';
import { ColorPickerComponent } from './color-picker.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    BannedEmailDirective,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
