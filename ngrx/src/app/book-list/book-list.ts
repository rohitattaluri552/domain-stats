import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './books.model';
import { CommonModule } from '@angular/common';
import { selectBookCollection } from '../state/books.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-list',
  imports: [ CommonModule],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookListComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() add = new EventEmitter<string>();

  collectionList;

  constructor(private store: Store) {
    this.collectionList = this.store.selectSignal(selectBookCollection);
  }

  // Method to define whether a book is in the collection
  isBookInCollection(book: Book): boolean {
    return this.collectionList().some(b => b.id === book.id);
  }

}