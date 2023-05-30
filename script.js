let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
    this.info = function () {
      return `${title} by ${author}, ${pages} pages, ${status ? "readed" : "not read yet"}`;
    }
  }
}

const myBook = new Book("La bliblia", "Jesus", 600, false);

function addBookToLibrary() {

}
