import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BookInfo } from './models/BookInfo';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DepartmentService } from '../../services/departments/department.service';
import { BookInfoComponent } from "../component/book-info/book-info.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  bookList: BookInfo[] = [];

  constructor(private http: HttpClient) {}

  department = inject(DepartmentService);

   ngOnInit(): void {
    this.fetchBooks();
  }

  private fetchBooks(): void { 
    this.department.getBooks().subscribe({
      next: (books) => (this.bookList = books),
      error: (error) => console.error('Error fetching books:', error),
    });
  }
}