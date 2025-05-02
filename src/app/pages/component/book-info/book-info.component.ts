import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BookInfo } from '../../home-page/models/BookInfo';
import { map } from 'rxjs';

@Component({
  selector: 'app-book-info',
  standalone: true,
  templateUrl: './book-info.component.html',
  styleUrl: './book-info.component.scss'
})
export class BookInfoComponent implements OnInit {
  private readonly getBookById = 'http://localhost:8080/api/customers/books/findById';
  bookId?: number;
  singleBook?: BookInfo;
  http = inject(HttpClient);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id'); // Extract 'id' from URL
      if (idParam) {
        this.bookId = Number(idParam); // Convert to number
        this.fetchBookDetails(this.bookId);
      }
    });
  }

fetchBookDetails(id: number) {
  this.http.get<BookInfo>(`${this.getBookById}/${id}`).pipe(
    map(book => ({
      ...book,
      image: `data:image/jpg;base64,${book.image}`
    }))
  ).subscribe({
    next: (book) => { this.singleBook = book; }, // Store fetched data
    error: (error) => console.error('Error fetching book details:', error),
  });
}
}