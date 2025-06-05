import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { Book } from '../book-list/books.model';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'app-book-collection',
  templateUrl: './book-collection.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCollectionComponent {
  readonly books = input<ReadonlyArray<Book>>([]);
  @Output() remove = new EventEmitter<string>();
}