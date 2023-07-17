import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiPopularResponse, Genres, Movies } from './types';
import { MoviesService } from './movies.service';
import {
  combineLatest,
  forkJoin,
  fromEvent,
  map,
  tap,
  filter,
  distinctUntilChanged,
  switchMap,
  Subscription,
} from 'rxjs';

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
  page = 1;

  subscriptions: Subscription[] = [];

  constructor(private service: MoviesService) {}

  ngOnInit(): void {
    const initSub = combineLatest([
      this.service.getGenres(),
      this.service.getPopularMovies(this.page),
    ]).subscribe(([genres, movies]) => {
      this.genres = genres;
      this.movies = movies;
    });

    const scroll$ = fromEvent(window, 'scroll');

    const scrollSub = scroll$
      .pipe(
        map((scrollEvent) => this.isBottomOfThePage()),
        distinctUntilChanged(),
        filter((isBottom) => isBottom === true),
        tap(() => this.page++),
        switchMap(() => this.service.getPopularMovies(this.page))
      )
      .subscribe((movies) => {
        console.log('On fait une requete');

        this.movies = [...this.movies, ...movies];
      });

    this.subscriptions.push(initSub, scrollSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  isBottomOfThePage() {
    const isBottom =
      document.documentElement.scrollTop +
        document.documentElement.clientHeight >=
      document.documentElement.scrollHeight - 300;
    return isBottom;
  }
}
