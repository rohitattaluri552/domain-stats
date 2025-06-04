import { createReducer, on } from '@ngrx/store';
import { BooksActions } from './books.actions';

export const initialState: ReadonlyArray<string> = [];

export const collectionReducer = createReducer(
  initialState,
  on(BooksActions.removeBook, (state, { bookId }) =>
  {
    debugger;
    return state.filter((id) => id !== bookId)
  }
  ),
  on(BooksActions.addBook, (state, { bookId }) => {
    debugger;
    if (state.indexOf(bookId) > -1) return state;

    return [...state, bookId];
  })
);