import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileUpload } from "../app.component";


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks() {
    return this.http.get('http://localhost:3000/books')
  }

  uploadBook(bookData: FileUpload) {
    const formData = new FormData();
    formData.append('file', bookData.file);
    formData.append('book_name', bookData.book_name);
    formData.append('author_name', bookData.author_name);
    return this.http.post('http://localhost:3000/books', formData)
  }
}
