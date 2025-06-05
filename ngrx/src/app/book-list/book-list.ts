import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { Book } from './books.model';
import { NgFor } from '@angular/common';
import { selectBookCollection } from '../state/books.selector';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-book-list',
  imports: [ NgFor ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent {
  readonly books = input<ReadonlyArray<Book>>([]);
  readonly collection = input<ReadonlyArray<Book>>([]);

  @Output() add = new EventEmitter<string>();

  // Method to define whether a book is in the collection
  isBookInCollection(book: Book): boolean {
    return this.collection().some(b => b.id === book.id);
  }

}