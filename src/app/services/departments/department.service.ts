import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StudentLoginDetails } from '../../pages/login-page/modal/StudentLoginDetails';
import { catchError, map, Observable, of } from 'rxjs';
import { BookInfo } from '../../pages/home-page/models/BookInfo';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  //private
  //public (input variable)

  //methods 
  // public
  // private

  readonly #getBookList = 'http://localhost:8080/api/customers/books/all';
  readonly #getBookById = 'http://localhost:8080/api/customers/books/findById';

  http = inject(HttpClient);
  getBooks(): Observable<BookInfo[]> {
    return this.http.get<BookInfo[]>(this.#getBookList).pipe(
      map((books) =>
        books.map((book) => ({
          ...book,
          image: `data:image/jpg;base64,${book.image}`,
        }))
      ),
      catchError((error) => {
        console.error('API Error:', error);
        return of([]); // Return empty array on error
      })
    );
  }
  getIndividualBooks(id: number): Observable<BookInfo> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<BookInfo>(`${this.#getBookById}/${id}`, { headers });
  }


}
