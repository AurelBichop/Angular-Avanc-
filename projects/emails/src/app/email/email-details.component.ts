import { Component } from '@angular/core';
import { Email } from './types';
import { ActivatedRoute } from '@angular/router';
import { FAKE_EMAILS_DATA } from '../data';

@Component({
  selector: 'app-email-details',
  template: `
    <h1>{{ email?.subject }}</h1>
    <div class="d-flex justify-content-between align-items-center">
      <em
        >{{ email?.contactName }} ({{ email?.from }}), le {{ email?.date }}</em
      >
      <button class="btn btn-danger">Supprimer</button>
    </div>
    <hr />
    <p *ngFor="let part of bodyParts">
      {{ part }}
    </p>
    <nav>
      <a href="#" class="btn btn-secondary">&lt; Mail précédent</a
      ><a href="#" class="btn btn-secondary">Mail suivant &gt;</a>
    </nav>
  `,
  styles: [],
})
export class EmailDetailsComponent {
  email?: Email;

  get bodyParts() {
    return this.email?.body.split('\r\n');
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        return;
      }

      const id = +paramMap.get('id')!;

      this.email = FAKE_EMAILS_DATA.find((email) => email.id === id) as Email;
    });
  }
}
