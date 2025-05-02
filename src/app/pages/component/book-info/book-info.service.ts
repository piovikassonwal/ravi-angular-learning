import { inject, Injectable } from '@angular/core';
import { DepartmentService } from '../../../services/departments/department.service';
import { BookInfo } from '../../home-page/models/BookInfo';
import { BookInfoComponent } from './book-info.component';

@Injectable({
  providedIn: 'root'
})
export class BookInfoService {
  sgBook?: BookInfo;
  constructor(private departmentService: DepartmentService) { }

  setBookDetail(id: number) {
    this.departmentService.getIndividualBooks(id).subscribe(
      {
        next: (book) => {
          this.sgBook = book;
        }
      }
    );
  }

  mapBook(){
    return this.sgBook;
  }
}
