import { Component } from '@angular/core';

@Component({
  selector: 'app-emails',
  template: `
    <div class="row">
      <div class="col-12 col-md-3">
        <a class="btn btn-dark d-block mb-4">Nouveau message</a>
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link">Boîte de réception</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Messages envoyés</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">Corbeille</a>
          </li>
        </ul>
      </div>
      <div class="col">
        <app-emails-list></app-emails-list>
        <app-email-details></app-email-details>
        <app-email-creation></app-email-creation>
      </div>
    </div>
  `,
  styles: [],
})
export class EmailsComponent {}
