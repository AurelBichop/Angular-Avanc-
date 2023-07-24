import { Component } from '@angular/core';
import { FAKE_EMAILS_DATA } from '../data';
import { Email } from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-emails-list',
  template: `
    <div *ngIf="emailAndTiltle$ | async as vm">
      <h1>{{ vm.title }}</h1>
      <table class="table">
        <tbody>
          <tr
            (click)="goToEmail(email.id)"
            [class.fw-bold]="!email.read"
            *ngFor="let email of vm.emails"
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
    </div>
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
  emailAndTiltle$?: Observable<{ emails: Email[]; title: string }>;

  constructor(private route: ActivatedRoute, private router: Router) {}

  goToEmail(id: number) {
    this.router.navigateByUrl('/emails/read/' + id);
  }

  ngOnInit(): void {
    this.emailAndTiltle$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('type')),
      map((type) => {
        if (!type) {
          return {
            emails: (FAKE_EMAILS_DATA as Email[]).filter(
              (email) => email.status === 'INBOX'
            ),
            title: 'Boite de Reception',
          };
        }

        return {
          emails: (FAKE_EMAILS_DATA as Email[]).filter(
            (email) => email.status === type?.toUpperCase()
          ),
          title: type === 'sent' ? 'Emails envoyé' : 'Corbeille',
        };
      })
    );
  }
}
