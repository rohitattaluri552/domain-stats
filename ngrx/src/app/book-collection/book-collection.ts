import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book-list/books.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.html',
  imports: [CommonModule],
})
export class BookCollectionComponent {
  @Input() books: ReadonlyArray<Book> = [];
  @Output() remove = new EventEmitter<string>();
}