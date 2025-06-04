import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { GoogleBooksService } from './book-list.service';
import { Book } from './books.model';
import { provideHttpClient, withFetch } from '@angular/common/http';

describe('GoogleBooksService', () => {
  let service: GoogleBooksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GoogleBooksService, 
        provideHttpClient(),
        provideHttpClientTesting()
    ]
    });
    service = TestBed.inject(GoogleBooksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch books with default size', () => {
    const mockBooks: Book[] = [{ id: '1', volumeInfo: { title: 'Book 1', authors: ['Author'] } }];
    service.getBooks().subscribe(books => {
      expect(books.length).toBe(1);
      expect(books[0].id).toBe('1');
    });

    const req = httpMock.expectOne(
      req => req.url.includes('https://www.googleapis.com/books/v1/volumes') && req.url.includes('maxResults=4')
    );
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockBooks });
  });

  it('should fetch books with given size', () => {
    const mockBooks: Book[] = [
      { id: '1', volumeInfo: { title: 'Book 1', authors: ['Author'] } },
      { id: '2', volumeInfo: { title: 'Book 2', authors: ['Author'] } }
    ];
    service.getBooks(2).subscribe(books => {
      expect(books.length).toBe(2);
    });

    const req = httpMock.expectOne(
      req => req.url.includes('maxResults=2')
    );
    expect(req.request.method).toBe('GET');
    req.flush({ items: mockBooks });
  });

  it('should return empty array if no items', () => {
    service.getBooks().subscribe(books => {
      expect(books.length).toBe(0);
    });

    const req = httpMock.expectOne(
      req => req.url.includes('maxResults=4')
    );
    req.flush({ });
  });
});