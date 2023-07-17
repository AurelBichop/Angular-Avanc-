import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
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

  beforeEach(() => {
    spectator = createSpectator({
      detectChanges: false,
    });

    spectator
      .inject(MoviesService)
      .getPopularMovies.and.returnValue(of(MOCK_MOVIES));

    spectator.inject(MoviesService).getGenres.and.returnValue(of([]));

    spectator.detectChanges();
  });

  it('should load more movies if we are at the bottom of the page', () => {
    spectator.component.isBottomOfThePage = () => true;
    window.dispatchEvent(new Event('scroll'));

    expect(spectator.component.movies).toHaveLength(4);
  });
  it('should not load more movies if we sroll but are not at the bottom of the page', () => {
    spectator.component.isBottomOfThePage = () => false;
    window.dispatchEvent(new Event('scroll'));

    expect(spectator.component.movies).toHaveLength(2);
  });

  it('should show movies', () => {
    expect(spectator.queryAll('.movie')).toHaveLength(2);
  });
});

describe('MoviesComponent avec TestBed', () => {
  let fixture: ComponentFixture<MoviesComponent>;
  let component: MoviesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      imports: [HttpClientTestingModule],
      providers: [MoviesService],
    }).compileComponents();

    const service = TestBed.inject(MoviesService);
    const spy = spyOn(service, 'getPopularMovies');

    const genreSpy = spyOn(service, 'getGenres');
    genreSpy.and.returnValue(of([]));

    spy.and.returnValue(of(MOCK_MOVIES));

    // Notre test
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load more movies if we are at the bottom of the page', async () => {
    component.isBottomOfThePage = () => true;

    window.dispatchEvent(new Event('scroll'));

    expect(fixture.componentInstance.movies.length).toBe(4);
  });

  it('should noy more movies if we are not at the bottom of the page', async () => {
    component.isBottomOfThePage = () => false;

    window.dispatchEvent(new Event('scroll'));

    expect(component.movies.length).toBe(2);
  });

  it('should show movies', async () => {
    // On s'assure que des films apparaissent
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.movie').length).toBe(2);
  });
});
