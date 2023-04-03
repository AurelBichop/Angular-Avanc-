import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <h1>Angular Avancé !</h1>
    <pre>{{ form.value | json }}</pre>
    Formulaire Valide : {{ form.valid }}
    <form #form="ngForm" (submit)="onSubmit(form)">
      <input
        required
        email
        ngModel
        #email="ngModel"
        [class.is-invalid]="email.touched && email.invalid"
        [class.is-valid]="email.touched && email.valid"
        type="email"
        name="email"
        id="email"
        class="form-control mb-2"
        placeholder="Votre adresse email"
      />
      <p
        class="invalid-feedback"
        *ngIf="email.touched && email.hasError('required')"
      >
        L'adresse email est obligatoire
      </p>
      <p
        class="invalid-feedback"
        *ngIf="email.touched && email.hasError('email')"
      >
        L'adresse email est invalide
      </p>
      <input
        ngModel
        type="password"
        name="password"
        id="password"
        class="form-control mb-2"
        placeholder="Mot de passe"
      />
      <input
        ngModel
        type="password"
        name="confirm"
        id="confirm"
        class="form-control mb-2"
        placeholder="Confirmation du mot de passe"
      />
      <button class="btn btn-success" [disabled]="form.invalid">
        Inscription
      </button>
    </form>
  </div>`,
  styles: [],
})
export class AppComponent {
  @ViewChild('email')
  emailInput?: ElementRef<HTMLInputElement>;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
