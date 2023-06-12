import { Component } from '@angular/core';

@Component({
  selector: 'app-movies',
  template: `
    <div class="row">
      <div class="col-4 mb-2" *ngFor="let movie of movies">
        <div class="card">
          <img
            src="https://image.tmdb.org/t/p/w500{{ movie.poster_path }}"
            alt=""
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">
              {{ movie.overview }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MoviesComponent {
  movies: any[] = [];

  ngOnInit(): void {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGQxMTVjYzcwZGU3NjExMTliMTU4NTI1NGI4YmNjZCIsInN1YiI6IjY0ODZkMDZmZTI3MjYwMDE0N2JhYzg3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FrybZWxxCEEh2t187jU-ut-CVZ74NOpQXNKSA_RyTxQ',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1',
      options
    )
      .then((response) => response.json())
      .then((result: any) => {
        this.movies = result.results;
      })
      .catch((err) => console.error(err));
  }
}
