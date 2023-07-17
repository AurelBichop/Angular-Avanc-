import { Component } from '@angular/core';

@Component({
  selector: 'app-emails-list',
  template: `
    <h1>Liste des emails</h1>
    <table class="table">
      <tbody>
        <tr>
          <td>Lior Chamla</td>
          <td class="w-50">Comment vas-tu ?!</td>
          <td>30/09/2022</td>
          <td>
            <button class="btn btn-sm btn-danger">Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class EmailsListComponent {}
