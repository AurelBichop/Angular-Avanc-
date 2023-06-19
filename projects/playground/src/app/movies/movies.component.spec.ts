import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { of } from 'rxjs';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

const MOCK_MOVIES = [
  {
    title: 'movie 1',
    id: 1,
    description: '',
    rating: 10,
    image: '',
  },
  {
    title: 'movie 2',
    id: 2,
    description: '',
    rating: 10,
    image: '',
  },
];

describe('MoviesComponent avec Spectator', () => {
  let spectator: Spectator<MoviesComponent>;

  const createSpectator = createComponentFactory({
    component: MoviesComponent,
    imports: [HttpClientTestingModule],
    mocks: [MoviesService],
  });

  it('should show movies', () => {
    spectator = createSpectator({
      detectChanges: false,
    });

    spectator
      .inject(MoviesService)
      .getPopularMovies.and.returnValue(of(MOCK_MOVIES));

    spectator.inject(MoviesService).getGenres.and.returnValue(of([]));

    spectator.detectChanges();

    expect(spectator.queryAll('.movie')).toHaveLength(2);
  });
});

describe('MoviesComponent avec TestBed', () => {
  it('should show movies', async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    const service = TestBed.inject(MoviesService);
    const spy = spyOn(service, 'getPopularMovies');

    spy.and.returnValue(of(MOCK_MOVIES));

    // Notre test
    const fixture = TestBed.createComponent(MoviesComponent);
    fixture.detectChanges();

    // On s'assure que des films apparaissent
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});
