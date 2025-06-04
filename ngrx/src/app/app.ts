import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BookListComponent } from './book-list/book-list';
import { BookCollectionComponent } from './book-collection/book-collection';
import { GoogleBooksService } from './book-list/book-list.service';
import { Store } from '@ngrx/store';
import { selectBookCollection, selectBooks } from './state/books.selector';
import { BooksActions, BooksApiActions } from './state/books.actions';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take, takeLast } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookListComponent, BookCollectionComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected title = 'ngrx';

  books$;
  bookCollection$;

  constructor(
    private bookListService: GoogleBooksService,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ){
    this.books$ = this.store.select(selectBooks);
    this.bookCollection$ = this.store.select(selectBookCollection);
  }

  ngOnInit() {
    this.activatedRoute.queryParams.pipe(
      map(params => params['size'] ?? 4),
      distinctUntilChanged(),
      switchMap(size => {
        return this.bookListService.getBooks(size);
      }),
    ).subscribe(books => 
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
    );
  }

  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }

  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
}
