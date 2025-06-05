import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './books.model';

@Injectable({ providedIn: 'root' })
export class GoogleBooksService {
  constructor(private http: HttpClient) {}

  getBooks(size: number): Observable<Array<Book>> {
    return this.http 
      .get<{ items: Book[] }>(
        `https://www.googleapis.com/books/v1/volumes?maxResults=${size}&orderBy=relevance&q=oliver%20sacks`
      )
      .pipe(map((books) => books.items || []));
  }
}