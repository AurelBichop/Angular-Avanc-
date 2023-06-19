import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPopularResponse, Genres, Movies } from './types';
import { MoviesService } from './movies.service';

@Component({
  selector: 'app-movies',
  template: `
    <div class="mb-5">
      <span class="badge bg-light" *ngFor="let genre of genres">
        {{ genre.name }}</span
      >
    </div>
    <div class="row movies">
      <div class="movie col-4 mb-2" *ngFor="let movie of movies">
        <div class="card">
          <img
            src="https://image.tmdb.org/t/p/w500{{ movie.image }}"
            alt=""
            class="card-img-top"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">
              {{ movie.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class MoviesComponent implements OnInit {
  movies: Movies = [];
  genres: Genres = [];

  constructor(private service: MoviesService) {}

  ngOnInit(): void {
    this.service.getGenres().subscribe((genres) => (this.genres = genres));

    this.service
      .getPopularMovies()
      .subscribe((movies) => (this.movies = movies));

    // fetch(
    //   'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1',
    //   options
    // )
    //   .then((response) => response.json())
    //   .then((result: any) => {
    //     this.movies = result.results;
    //   })
    //   .catch((err) => console.error(err));
  }
}
