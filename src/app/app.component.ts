import {Component, ContentChild, ElementRef, ViewChild} from '@angular/core';
import {BooksService} from "./services/books.service";

export class FileUpload {
    public book_name: string;
    public author_name: string;
    public file: File;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'booksUi';

    @ViewChild('dialog') dialog: ElementRef;

    public form = new FileUpload();
    public books: any[] = [];

  constructor (
      private booksService: BooksService
  ) {
      this.booksService.getBooks().subscribe(data => {
          this.books = <any[]>data;
      })
  }

    setFileData(event) {
        let target = event.target || event.srcElement;
        this.form.file = target.files[0];
    }

    upload() {
        this.booksService.uploadBook(this.form).subscribe((data) => {
            this.books.push(data);
            this.dialog.nativeElement.close();
        });
    }

    openModal() {
        this.dialog.nativeElement.showModal();
    }

    closeDialog() {
        this.dialog.nativeElement.close();
    }
}
