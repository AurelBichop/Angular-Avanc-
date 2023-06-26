import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoviesKeyInterceptor } from './movies-key.interceptor';
import { SpectatorHttp, createHttpFactory } from '@ngneat/spectator';

describe('MoviesKeyInterceptor avec TestBed', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MoviesKeyInterceptor,
          multi: true,
        },
      ],
    });
  });
  it('should not add langage', (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http
      .get('https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1')
      .subscribe(() => {
        expect(true).toBe(true);
        done();
      });

    httpController
      .expectOne(
        'https://api.themoviedb.org/3/movie/top_rated?language=fr-FR&page=1'
      )
      .flush({});
  });

  it('should add langage to a request url', (done: DoneFn) => {
    const http = TestBed.inject(HttpClient);
    const httpController = TestBed.inject(HttpTestingController);

    http.get('https://api.themoviedb.org/3/genre/movie/list').subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    httpController
      .expectOne('https://api.themoviedb.org/3/genre/movie/list?language=fr-FR')
      .flush({});
  });
});

describe('MoviesKeyInterceptor avec Spectator', () => {
  let spectator: SpectatorHttp<MoviesKeyInterceptor>;

  const createSpectator = createHttpFactory({
    service: MoviesKeyInterceptor,
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MoviesKeyInterceptor,
        multi: true,
      },
    ],
  });

  it('should add langage to a request url', (done: DoneFn) => {
    spectator = createSpectator();

    spectator.httpClient.get('http://mon-url.com').subscribe(() => {
      expect(true).toBe(true);
      done();
    });

    spectator.controller
      .expectOne('http://mon-url.com?language=fr-FR')
      .flush({});
  });

  it('should not add langage', (done: DoneFn) => {
    spectator = createSpectator();

    spectator.httpClient
      .get('http://mon-url.com?language=fr-FR')
      .subscribe(() => {
        expect(true).toBe(true);
        done();
      });

    spectator.controller
      .expectOne('http://mon-url.com?language=fr-FR')
      .flush({});
  });
});
