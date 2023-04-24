import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<div class="container">
    <h1>Angular Avancé !</h1>
    <pre>{{ form.value | json }}</pre>
    Formulaire Valide : {{ form.valid }}
    <form
      ngForm
      #form="ngForm"
      [ngFormOptions]="{ updateOn: 'change' }"
      (submit)="onSubmit(form)"
    >
      <input
        required
        bannedEmail="test@test.com"
        uniqueEmail
        email
        ngModel
        [ngModelOptions]="{ updateOn: 'change' }"
        #email="ngModel"
        [class.is-invalid]="email.touched && email.invalid"
        [class.is-valid]="email.touched && email.valid"
        type="email"
        name="email"
        id="email"
        class="form-control mb-2"
        placeholder="Votre adresse email"
      />
      <p class="text-info" *ngIf="email.pending">
        <span class="spinner-border spinner-border-sm"></span>
        Vérification en Cours
      </p>
      <p
        class="invalid-feedback"
        *ngIf="email.touched && email.hasError('bannedEmail')"
      >
        L'adresse email {{ email.getError('bannedEmail') }} est interdite
      </p>
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
      <div ngModelGroup="security" confirmPassword>
        <input
          required
          minlength="3"
          ngModel
          [class.is-invalid]="password.touched && password.invalid"
          [class.is-valid]="password.touched && password.valid"
          #password="ngModel"
          type="password"
          name="password"
          id="password"
          class="form-control mb-2"
          placeholder="Mot de passe"
        />
        <p
          class="invalid-feedback"
          *ngIf="password.touched && password.hasError('required')"
        >
          Le mot de passe est Obligatoire
        </p>
        <p
          class="invalid-feedback"
          *ngIf="password.touched && password.hasError('minlength')"
        >
          Le mot de passe doit faire plus de 3 caractères
        </p>
        <input
          required
          minlength="3"
          ngModel
          [class.is-invalid]="confirm.touched && confirm.invalid"
          [class.is-valid]="confirm.touched && confirm.valid"
          #confirm="ngModel"
          type="password"
          name="confirm"
          id="confirm"
          class="form-control mb-2"
          placeholder="Confirmation du mot de passe"
        />
        <p
          class="invalid-feedback"
          *ngIf="confirm.touched && confirm.hasError('required')"
        >
          La confirmation est Obligatoire
        </p>
        <p
          class="invalid-feedback"
          *ngIf="confirm.touched && confirm.hasError('minlength')"
        >
          La confirmation doit faire plus de 3 caractères
        </p>
        <p
          class="invalid-feedback"
          *ngIf="confirm.touched && confirm.hasError('confirmPassword')"
        >
          La confirmation ne correspond pas au mot de passe
        </p>
      </div>
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
