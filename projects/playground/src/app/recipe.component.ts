import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  template: `
    <form [formGroup]="recette" (submit)="onSubmit()">
      <input
        formControlName="titre"
        required
        minlength="4"
        [class.is-invalid]="titre.touched && titre.invalid"
        [class.is-valid]="titre.dirty && titre.valid"
        type="text"
        name="titre"
        id="titre"
        class="form-control mb-2"
        placeholder="Titre de votre recette"
      />
      <p
        class="invalid-feedback"
        *ngIf="titre.touched && titre.hasError('required')"
      >
        Le titre est obligatoire.
      </p>
      <p
        class="invalid-feedback"
        *ngIf="titre.touched && titre.hasError('minlength')"
      >
        Longeur minimal de 4 caracteres
      </p>
      <h3>
        Les Ingrédients
        <button
          (click)="addIngedients()"
          class="btn btn-primary btn-sm"
          type="button"
        >
          + Ajouter
        </button>
      </h3>

      <div
        [formGroup]="group"
        class="row"
        *ngFor="let group of ingredients.controls; let i = index"
      >
        <div class="col">
          <input
            required
            [class.is-invalid]="
              group.controls.name.touched && group.controls.name.invalid
            "
            [class.is-valid]="
              group.controls.name.dirty && group.controls.name.valid
            "
            minlength="4"
            type="text"
            name=""
            class="form-control mb-2"
            placeholder="Nom de l'ingredient"
            formControlName="name"
          />
        </div>
        <div class="col">
          <input
            [class.is-invalid]="
              group.controls.quantite.touched && group.controls.quantite.invalid
            "
            [class.is-valid]="
              group.controls.quantite.dirty && group.controls.quantite.valid
            "
            required
            type="number"
            formControlName="quantite"
            class="form-control"
          />
        </div>
        <div (click)="ingredients.removeAt(i)" class="col-1">
          <button class="btn btn-sm btn-danger" type="button">X</button>
        </div>
      </div>

      <button class="btn btn-success">Créeer la Recette</button>
    </form>
  `,
})
export class RecipesComponent {
  get ingredients() {
    return this.recette.controls.ingredients;
  }

  addIngedients() {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        quantite: new FormControl('', [Validators.required]),
      })
    );
  }

  recette = new FormGroup({
    titre: new FormControl('', [Validators.required, Validators.minLength(4)]),
    ingredients: new FormArray<
      FormGroup<{ name: FormControl; quantite: FormControl }>
    >([
      new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        quantite: new FormControl('', [Validators.required]),
      }),
    ]),
  });

  onSubmit() {
    console.log(this.recette.value);
  }

  get titre() {
    return this.recette.controls.titre;
  }
}
