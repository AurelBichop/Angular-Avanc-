import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class UserModule {}
