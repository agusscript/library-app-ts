import { Book } from "./entities/book";
import { validateEmptyInput, validatePages } from "./validations/validations";
import {
  bookLibrary,
  saveInLocalStorage,
  checkLocalStorage,
} from "./storage/localStorage";

const title = <HTMLInputElement>document.querySelector("#title");
const author = <HTMLInputElement>document.querySelector("#author");
const pages = <HTMLInputElement>document.querySelector("#pages");
const addButton = <HTMLButtonElement>document.querySelector(".add-btn");
const booksContainer = <HTMLDivElement>document.querySelector(".books-container");

function removeChildren(element: Element): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function deleteBook(book: any): void {
  const elementId: number = book.target.parentNode.parentNode.dataset.id;
  bookLibrary.splice(elementId, 1);
}

function clearField(element: HTMLInputElement): void {
  element.value = "";
}

function createCardBook(book: Book): void {
  const cardBook = document.createElement("div");
  const buttonsContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const bookTitle = document.createElement("p");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const removeButton = document.createElement("button");
  const statusButton = document.createElement("button");

  let bookDataId = Number(cardBook.dataset.id);
  bookDataId = book.id;
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
    removeChildren(booksContainer);
    showBooks(bookLibrary);
  };
  statusButton.textContent = book.textButtonStatus;

  bookTitle.textContent = `"${book.title}"`;
  bookAuthor.textContent = book.author;
  bookPages.textContent = `${book.pages} Pages`;

  cardBook.append(textContainer, buttonsContainer);
  textContainer.append(bookTitle, bookAuthor, bookPages);
  buttonsContainer.append(statusButton, removeButton);
  booksContainer.appendChild(cardBook);
}

function changeButtonStatus(book: any): void {
  const elementId = book.target.parentNode.parentNode.dataset.id;

  if (bookLibrary[elementId].status) {
    bookLibrary[elementId].status = false;
    bookLibrary[elementId].textButtonStatus = "Unread";
  } else {
    bookLibrary[elementId].status = true;
    bookLibrary[elementId].textButtonStatus = "Read";
  }
}

function manageDeleteConfirmation(book: any): void {
  if (confirm("Delete this book?")) {
    deleteBook(book);
    saveInLocalStorage(bookLibrary);
    removeChildren(booksContainer);
    showBooks(bookLibrary);
  }
}

function addBookToLibrary(array: Array<Book>): void {
  const id = 0;
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = Number(pages.value);
  const newBook = new Book(id, titleValue, authorValue, pagesValue, false, "Unread");

  array.unshift(newBook);

  clearField(title);
  clearField(author);
  clearField(pages);
}

function showBooks(array: Array<Book>): void {
  array.forEach((book, i) => {
    book.id = i;
    createCardBook(book);
  });
}

function validateForm(): void {
  const titleEmpty = validateEmptyInput(title);
  const authorEmpty = validateEmptyInput(author);
  const pagesEmpty = validateEmptyInput(pages);
  const pagesNegative = validatePages(pages);

  if (titleEmpty + authorEmpty + pagesEmpty + pagesNegative === 0) {
    addBookToLibrary(bookLibrary);
    removeChildren(booksContainer);
    saveInLocalStorage(bookLibrary);
    checkLocalStorage();
    showBooks(bookLibrary);
  }

  event?.preventDefault();
}

addButton.onclick = () => {
  validateForm();
};

checkLocalStorage();
showBooks(bookLibrary);
