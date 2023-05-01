import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Angular Avancé !</h1>
      <form>
        <input
          [formControl]="email"
          [class.is-invalid]="email.dirty && email.invalid"
          type="email"
          name="email"
          id="email"
          class="form-control mb-2"
          placeholder="Votre adresse email"
        />
        <p class="text-info" *ngIf="email.pending">
          <span class="spinner-border border-spinner-sm"></span>
          Chargement ...
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('required')"
        >
          L'adresse email est obligatoire.
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('email')"
        >
          L'adresse email n'est pas valide.
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('bannedEmail')"
        >
          L'adresse email est Interdite
        </p>
        <p
          class="invalid-feedback"
          *ngIf="email.touched && email.hasError('uniqueEmail')"
        >
          L'adresse email existe déja
        </p>
        <input
          [formControl]="password"
          [class.is-invalid]="password.touched && password.invalid"
          [class.is-valid]="password.touched && password.valid"
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
          Mot de passe Obligatoire
        </p>
        <p
          class="invalid-feedback"
          *ngIf="password.touched && password.hasError('minlength')"
        >
          Longeur minimal de 4 caracteres
        </p>
        <input
          type="password"
          name="confirm"
          id="confirm"
          class="form-control mb-2"
          placeholder="Confirmation du mot de passe"
        />

        <button class="btn btn-success">Inscription</button>
      </form>
    </div>
  `,
})
export class AppComponent {
  email = new FormControl(
    '',
    [
      Validators.required,
      Validators.email,
      createBannedEmailValidator('test@test.com'),
    ],
    [uniqueEmailValidator]
  );

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
}

const uniqueEmailValidator: AsyncValidatorFn = (
  control: AbstractControl<string>
) => {
  return fetch(
    'https://jsonplaceholder.typicode.com/users?email=' + control.value
  )
    .then((response) => response.json())
    .then((users: any[]) => {
      if (users.length > 0) {
        return { uniqueEmail: true };
      }
      return null;
    });
};

const createBannedEmailValidator = (bannedEmail: string) => {
  const bannedEmailValidator: ValidatorFn = (
    control: AbstractControl<string>
  ) => {
    if (control.value === bannedEmail) {
      return { bannedEmail: true };
    }

    return null;
  };

  return bannedEmailValidator;
};
