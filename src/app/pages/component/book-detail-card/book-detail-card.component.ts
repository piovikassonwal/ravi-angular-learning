import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../services/departments/department.service';
import { BookInfo } from '../../home-page/models/BookInfo';

@Component({
  selector: 'app-book-detail-card',
  standalone: true,
  templateUrl: './book-detail-card.component.html',
  styleUrl: './book-detail-card.component.scss'
})
export class BookDetailCardComponent implements OnInit {
  bookList: BookInfo[] = [];
  department = inject(DepartmentService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.department.getBooks().subscribe({
      next: (books) => (this.bookList = books),
      error: (error) => console.error('Error fetching books:', error),
    });
  }

  displayBook(id: number) {
    this.router.navigate([`/book/${id}`]);
  }
}