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
    this.textButtonStatus = status
      ? (this.textButtonStatus = "Read")
      : (this.textButtonStatus = "Not Read");
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

function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function deleteBook(book) {
  const elementId = book.target.parentNode.parentNode.dataset.id;
  bookLibrary.splice(elementId, 1);

  removeChildren($booksContainer);
  showBooks(bookLibrary);
}

function changeButtonStatus(book) {
  const elementId = book.target.parentNode.parentNode.dataset.id;

  if (bookLibrary[elementId].status) {
    bookLibrary[elementId].status = false;
    bookLibrary[elementId].textButtonStatus = "Not Read";
  } else {
    bookLibrary[elementId].status = true;
    bookLibrary[elementId].textButtonStatus = "Read";
  }

  removeChildren($booksContainer);
  showBooks(bookLibrary);
}

function createCardBook(book) {
  const cardBook = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const removeButton = document.createElement("button");
  const statusButton = document.createElement("button");

  cardBook.dataset.id = book.id;
  cardBook.setAttribute("class", "card-book");

  buttonsContainer.setAttribute("class", "button-container");
  textContainer.setAttribute("class", "text-container");

  removeButton.setAttribute("class", "remove-btn");
  removeButton.onclick = (book) => deleteBook(book);
  removeButton.textContent = "Delete";

  statusButton.setAttribute("class", "status-btn");
  statusButton.onclick = (book) => changeButtonStatus(book);
  statusButton.textContent = book.textButtonStatus;

  bookTitle.textContent = `"${book.title}"`;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} Pages`;

  cardBook.append(textContainer, buttonsContainer);
  textContainer.append(bookTitle, bookAuthor, bookPages);
  buttonsContainer.append(statusButton, removeButton);
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

function showBooks(array) {
  array.forEach((book, i) => {
    book.id = i;
    createCardBook(book);
  });
}

document.querySelector(".add-btn").onclick = () => {
  addBookToLibrary(bookLibrary);
};

showBooks(bookLibrary);
