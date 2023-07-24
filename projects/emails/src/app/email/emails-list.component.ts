import { Component } from '@angular/core';
import { FAKE_EMAILS_DATA } from '../data';
import { Email } from './types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emails-list',
  template: `
    <h1>{{ title }}</h1>
    <table class="table">
      <tbody>
        <tr
          (click)="goToEmail(email.id)"
          [class.fw-bold]="!email.read"
          *ngFor="let email of emails"
        >
          <td>{{ email.contactName }}</td>
          <td class="w-50">{{ email.subject }}</td>
          <td>{{ email.date }}</td>
          <td>
            <button class="btn btn-sm btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      tr:hover {
        background-color: #eee;
      }

      tr {
        cursor: pointer;
      }
    `,
  ],
})
export class EmailsListComponent {
  emails: Email[] = [];
  title: string = 'Boite de Reception';

  constructor(private route: ActivatedRoute, private router: Router) {}

  goToEmail(id: number) {
    this.router.navigateByUrl('/emails/read/' + id);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const type = paramMap.get('type');
      //console.log(type);

      if (!type) {
        this.emails = (FAKE_EMAILS_DATA as Email[]).filter(
          (email) => email.status === 'INBOX'
        );
        this.title = 'Boite de Reception';
        return;
      }

      this.emails = (FAKE_EMAILS_DATA as Email[]).filter(
        (email) => email.status === type?.toUpperCase()
      );

      if (type === 'sent') {
        this.title = 'Emails Envoyé';
        return;
      }

      this.title = 'Corbeille';
    });
  }
}
