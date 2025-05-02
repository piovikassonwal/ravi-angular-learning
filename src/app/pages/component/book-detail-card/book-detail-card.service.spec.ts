import { TestBed } from '@angular/core/testing';

import { BookDetailCardService } from './book-detail-card.service';

describe('BookDetailCardService', () => {
  let service: BookDetailCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDetailCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
