import { Component } from '@angular/core';
import { Email } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { FAKE_EMAILS_DATA } from '../data';
import { Observable, filter, map } from 'rxjs';

@Component({
  selector: 'app-email-details',
  template: `
    <ng-template #fallback>
      <h3>Une erreur est survenue, aucun email trouvé</h3>
      <a [routerLink]="['../../']" class="btn btn-primary"
        >Retour à la boite de reception</a
      >
    </ng-template>
    <div *ngIf="email$ | async as email; else fallback">
      <h1>{{ email.subject }}</h1>
      <div class="d-flex justify-content-between align-items-center">
        <em>{{ email.contactName }} ({{ email.from }}), le {{ email.date }}</em>
        <button class="btn btn-danger" (click)="deleteEmail()">
          Supprimer
        </button>
      </div>
      <hr />
      <p *ngFor="let part of getBodyParts(email.body)">
        {{ part }}
      </p>
      <nav>
        <a [routerLink]="['../', email.id - 1]" class="btn btn-secondary"
          >&lt; Mail précédent</a
        ><a [routerLink]="['../', email.id + 1]" class="btn btn-secondary"
          >Mail suivant &gt;</a
        >
      </nav>
    </div>
  `,
  styles: [],
})
export class EmailDetailsComponent {
  email$?: Observable<Email>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  deleteEmail() {
    this.router.navigate(['../../'], {
      relativeTo: this.route,
    });
  }

  getBodyParts(body: string) {
    return body.split('\r\n');
  }

  ngOnInit(): void {
    this.email$ = this.route.paramMap.pipe(
      filter((paramMap) => paramMap.has('id')),
      map((paramMap) => +paramMap.get('id')!),
      map((id) => FAKE_EMAILS_DATA.find((email) => email.id === id) as Email)
    );
  }
}
