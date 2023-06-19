import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiGenresResponse, ApiMovie } from './types';
import {
  Spectator,
  SpectatorHttp,
  SpectatorService,
  createHttpFactory,
  createServiceFactory,
} from '@ngneat/spectator';

const MOCK_GENRES_RESPONSE: ApiGenresResponse = {
  genres: [
    {
      id: 1,
      name: 'Action',
    },
    {
      id: 2,
      name: 'Aventure',
    },
  ],
};

const MOCK_POPULAR_RESPONSE = [
  {
    title: 'Movie 1',
    overview: 'MOCK_OVERVIEW',
    vote_average: 10,
  } as ApiMovie,
  {
    title: 'Movie 2',
    overview: 'MOCK_OVERVIEW2',
    vote_average: 8,
  } as ApiMovie,
];

describe('MoviesService avec TestBed', () => {
  it('should get and transform genres', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getGenres().subscribe((genres) => {
      expect(genres.length).toBe(2);
      expect(genres[0].id).toBe(1);
      expect(genres[0].name).toBe('Action');
      done();
    });

    const request = httpController.expectOne(
      'https://api.themoviedb.org/3/genre/movie/list?language=fr-FR'
    );

    request.flush(MOCK_GENRES_RESPONSE);
  });

  it('should get transformed popular movies', (done: DoneFn) => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    const service = new MoviesService(http);

    service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].description).toBe('MOCK_OVERVIEW');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = httpController.expectOne(
      'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1'
    );

    request.flush({
      results: MOCK_POPULAR_RESPONSE,
    });
  });
});

describe('MoviesService avec Spectator', () => {
  let spectator: SpectatorHttp<MoviesService>;

  const createService = createHttpFactory({
    service: MoviesService,
  });

  it('should get and transform genres', (done: DoneFn) => {
    spectator = createService();

    spectator.service.getGenres().subscribe((genres) => {
      expect(genres.length).toBe(2);
      expect(genres[0].id).toBe(1);
      expect(genres[0].name).toBe('Action');
      done();
    });

    const request = spectator.controller.expectOne(
      'https://api.themoviedb.org/3/genre/movie/list?language=fr-FR'
    );

    request.flush(MOCK_GENRES_RESPONSE);
  });

  it('should get transformed popular movies', (done: DoneFn) => {
    spectator = createService();

    spectator.service.getPopularMovies().subscribe((movies) => {
      expect(movies.length).toBe(2);
      expect(movies[0].description).toBe('MOCK_OVERVIEW');
      expect(movies[0].rating).toBe(10);
      done();
    });

    const request = spectator.controller.expectOne(
      'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1'
    );

    request.flush({
      results: MOCK_POPULAR_RESPONSE,
    });
  });
});
