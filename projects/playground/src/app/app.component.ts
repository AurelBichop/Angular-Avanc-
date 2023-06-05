import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Angular Avancé !</h1>
      <form [formGroup]="inscription" (submit)="onSubmit()">
        <input
          formControlName="email"
          [class.is-invalid]="email.dirty && email.invalid"
          [class.is-valid]="email.dirty && email.valid"
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
        <div formGroupName="security">
          <input
            formControlName="password"
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
            formControlName="confirm"
            [class.is-invalid]="confirm.touched && confirm.invalid"
            [class.is-valid]="confirm.touched && confirm.valid"
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
            La confirmation est obligatoire
          </p>
          <p
            class="invalid-feedback"
            *ngIf="confirm.touched && confirm.hasError('confirmPassword')"
          >
            La confirmation n'est pas identique au mot de passe
          </p>
        </div>

        <h3>
          Quels sont vos langages favoris ?
          <button
            (click)="addLanguages()"
            class="btn btn-primary btn-sm"
            type="button"
          >
            + Ajouter un languages
          </button>
        </h3>

        <div class="alert bg-info" *ngIf="languages.controls.length === 0">
          Vous n'avez pas ajoutez de langages
        </div>
        <div
          class="row"
          *ngFor="let group of languages.controls; let i = index"
          [formGroup]="group"
        >
          <div class="col">
            <input
              type="text"
              name=""
              class="form-control mb-2"
              placeholder="Nom du language"
              formControlName="name"
            />
          </div>
          <div class="col">
            <select formControlName="level" class="form-control">
              <option value="debutant">Débutant(e)</option>
              <option value="confirme">Confirmé(e)</option>
            </select>
          </div>
          <div (click)="languages.removeAt(i)" class="col-1">
            <button class="btn btn-sm btn-danger" type="button">X</button>
          </div>
        </div>

        <button class="btn btn-success">Inscription</button>
      </form>
    </div>
  `,
})
export class AppComponent {
  get languages() {
    return this.inscription.controls.languages;
  }

  addLanguages() {
    this.languages.push(
      new FormGroup({
        name: new FormControl(),
        level: new FormControl('debutant'),
      })
    );
  }

  inscription = new FormGroup({
    languages: new FormArray<FormGroup>([]),
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email,
        createBannedEmailValidator('test@test.com'),
      ],
      [uniqueEmailValidator]
    ),
    security: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirm: new FormControl('', [Validators.required]),
      },
      {
        validators: [confirmPasswordValidator],
      }
    ),
  });

  onSubmit() {
    console.log(this.inscription.value);
  }

  get email() {
    return this.inscription.controls.email;
  }

  get password() {
    return this.security.controls.password;
  }

  get confirm() {
    return this.security.controls.confirm;
  }

  get security() {
    return this.inscription.controls.security;
  }

  ngOnInit() {
    //Requete HTTP qui reçoit les informations des utilisateurs-trice
    this.addLanguages();
    this.addLanguages();

    this.inscription.setValue({
      email: 'aurel@laposte.net',
      security: {
        password: 'toto',
        confirm: 'toto',
      },
      languages: [
        { name: 'php', level: 'debutant' },
        { name: 'javascript', level: 'confirme' },
      ],
    });
  }
}

const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl<{
    password: FormControl<string>;
    confirm: FormControl<string>;
  }>
) => {
  const password = control.get('password');
  const confirm = control.get('confirm');

  if (password?.value === confirm?.value) {
    return null;
  }
  confirm?.setErrors({ confirmPassword: true });
  return { confirmPassword: true };
};

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
