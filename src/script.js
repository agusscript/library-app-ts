const $titleInput = document.querySelector("#title");
const $authorInput = document.querySelector("#author");
const $pagesInput = document.querySelector("#pages");
const $booksContainer = document.querySelector(".books-container");
let bookLibrary = [];

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

let bookLibraryDefault = [
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
}

function saveInLocalStorage(element) {
  localStorage.setItem("library", JSON.stringify(element));
}

function manageDeleteConfirmation(book) {
  if (confirm("Delete this book?")) {
    deleteBook(book);
    saveInLocalStorage(bookLibrary);
    removeChildren($booksContainer);
    showBooks(bookLibrary);
  }
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
  removeButton.onclick = (book) => manageDeleteConfirmation(book);
  removeButton.textContent = "Delete";

  statusButton.setAttribute("class", "status-btn");
  statusButton.onclick = (book) => {
    changeButtonStatus(book);
    saveInLocalStorage(bookLibrary);
    removeChildren($booksContainer);
    showBooks(bookLibrary);
  };
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

  array.unshift(newBook);

  clearField($titleInput);
  clearField($authorInput);
  clearField($pagesInput);
}

function showBooks(array) {
  array.forEach((book, i) => {
    book.id = i;
    createCardBook(book);
  });
}

function checkLocalStorage() {
  const libraryLocalStorage = JSON.parse(localStorage.getItem("library"));

  if (!libraryLocalStorage) {
    bookLibrary = bookLibraryDefault;
  } else {
    bookLibrary = libraryLocalStorage;
  }
}

function validateEmptyInput(input) {
  let error = 0;

  if (input.value.length === 0) {
    input.classList.add("error");
    input.setAttribute("placeholder", "Required field");
    error = 1;
  } else {
    input.classList.remove("error");
    input.setAttribute("placeholder", "");
    error = 0;
  }

  return error;
}

function validatePages(input) {
  let error = 0;

  if (input.value < 1) {
    input.classList.add("error");
    input.setAttribute("placeholder", "Not valid pages");
    error = 1;
  } else {
    input.classList.remove("error");
    input.setAttribute("placeholder", "");
    error = 0;
  }

  return error;
}

function validateForm() {
  const titleEmpty = validateEmptyInput($titleInput);
  const authorEmpty = validateEmptyInput($authorInput);
  const pagesEmpty = validateEmptyInput($pagesInput);
  const pagesNegative = validatePages($pagesInput);

  if (titleEmpty + authorEmpty + pagesEmpty + pagesNegative === 0) {
    addBookToLibrary(bookLibrary);
    removeChildren($booksContainer);
    saveInLocalStorage(bookLibrary);
    checkLocalStorage();
    showBooks(bookLibrary);
  }

  event.preventDefault();
}

document.querySelector(".add-btn").onclick = () => {
  validateForm();
};

checkLocalStorage();
showBooks(bookLibrary);
