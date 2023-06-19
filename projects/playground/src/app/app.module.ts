import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { InscriptionComponent } from './inscription.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannedEmailDirective } from './banned-email.directive';
import { UniqueEmailValidator } from './unique-email.directive';
import { ConfirmPasswordValidator } from './confirm-password.directive';
import { ColorPickerComponent } from './color-picker.component';
import { ReactiveInscriptionComponent } from './reactive-inscription.component';
import { AppComponent } from './app.component';
import { RecipesComponent } from './recipe.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './movies/movies.service';

@NgModule({
  declarations: [
    AppComponent,
    ReactiveInscriptionComponent,
    RecipesComponent,
    InscriptionComponent,
    BannedEmailDirective,
    UniqueEmailValidator,
    ConfirmPasswordValidator,
    ColorPickerComponent,
    MoviesComponent,
  ],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [MoviesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
