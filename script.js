const $titleInput = document.querySelector("#title");
const $authorInput = document.querySelector("#author");
const $pagesInput = document.querySelector("#pages");
const $booksContainer = document.querySelector(".books-container");

class Book {
  constructor(id, title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = () => {
      return `${title} by ${author}, ${pages} pages,
       ${status ? "readed" : "not read yet"}`;
    };
  }
}

let bookLibrary = [
  new Book("", "The Little Prince", "Antoine de Saint-Exupéry", 85, true),
  new Book("", "The Picture of Dorian Gray", "Oscar Wilde", 272, false),
  new Book("", "The Knight in Rusty Armor", "Robert Fisher", 42, true),
  new Book("", "The Old Man and the Sea", "Ernest Hemingway", 96, false),
];

function clearField(element) {
  element.value = "";
}

function createBook(book) {
  const cardBook = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const removeButton = document.createElement("button");

  cardBook.dataset.id = book.id;
  cardBook.setAttribute("class", "card-book");
  removeButton.setAttribute("class", "remove-btn");
  removeButton.onclick = (event) => deleteBook(event);

  removeButton.textContent = "X";
  bookTitle.textContent = book.info();
  bookAuthor.textContent = book.author;
  bookPages.textContent = book.pages;

  cardBook.append(bookTitle);
  cardBook.appendChild(removeButton);
  $booksContainer.appendChild(cardBook);
}

function addBookToLibrary(array) {
  const id = "";
  const title = $titleInput.value;
  const author = $authorInput.value;
  const pages = $pagesInput.value;
  const newBook = new Book(id, title, author, pages);

  array.push(newBook);

  removeChildren($booksContainer);
  showBooks(bookLibrary);

  clearField($titleInput);
  clearField($authorInput);
  clearField($pagesInput);

  event.preventDefault();
}

function deleteBook(event) {
  const elementId = event.target.parentNode.dataset.id;
  bookLibrary.splice(elementId, 1);

  removeChildren($booksContainer);
  showBooks(bookLibrary);
}

function showBooks(array) {
  array.forEach((book, i) => {
    book.id = i;
    createBook(book);
  });
}

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

document.querySelector(".add-btn").onclick = () => {
  addBookToLibrary(bookLibrary);
};

showBooks(bookLibrary);
