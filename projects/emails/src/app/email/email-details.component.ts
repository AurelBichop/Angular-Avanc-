import { Component } from '@angular/core';

@Component({
  selector: 'app-email-details',
  template: `
    <h1>Subject</h1>
    <div class="d-flex justify-content-between align-items-center">
      <em>De Lior Chamla (lior@mail.com), le 20/01/2022</em>
      <button class="btn btn-danger">Supprimer</button>
    </div>
    <hr />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae earum
      doloribus, ipsum nemo et sapiente aut, necessitatibus enim quod cum porro
      voluptatem vero adipisci, est veritatis excepturi culpa unde? Accusamus?
    </p>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque nam sed
      exercitationem magni quibusdam blanditiis velit officia magnam veniam
      repellendus.
    </p>
    <nav>
      <a href="#" class="btn btn-secondary">&lt; Mail précédent</a
      ><a href="#" class="btn btn-secondary">Mail suivant &gt;</a>
    </nav>
  `,
  styles: [],
})
export class EmailDetailsComponent {}
