import { HttpClient } from '@angular/common/http';
import { ApiPopularResponse, Movie, Genres, ApiGenresResponse } from './types';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiKey } from './api.key';

@Injectable()
export class MoviesService {
  options: Object = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  constructor(private http: HttpClient) {}

  getGenres() {
    return this.http
      .get<ApiGenresResponse>(
        'https://api.themoviedb.org/3/genre/movie/list',
        this.options
      )
      .pipe(map((apiResponse) => apiResponse.genres));
  }

  getPopularMovies() {
    return this.http
      .get<ApiPopularResponse>(
        'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1',
        this.options
      )
      .pipe(
        map((response) => {
          return response.results.map((item) => {
            return {
              id: item.id,
              title: item.title,
              description: item.overview,
              rating: item.vote_average,
              image: 'https://image.tmdb.org/t/p/w500' + item.poster_path,
            } as Movie;
          });
        })
      );
  }
}
