import { Book } from "../entities/book";

export let bookLibraryDefault: Array<Book> = [
  new Book(0, "The Little Prince", "Antoine de Saint-Exupéry", 85, true, "Unread"),
  new Book(0, "The Picture of Dorian Gray", "Oscar Wilde", 272, false, "Unread"),
  new Book(0, "The Knight in Rusty Armor", "Robert Fisher", 42, true, "Unread"),
  new Book(0, "The Old Man and the Sea", "Ernest Hemingway", 96, false, "Unread"),
];

export let bookLibrary: Array<Book> = [];

export function saveInLocalStorage(element: Array<Book>): void {
  localStorage.setItem("library", JSON.stringify(element));
}

export function checkLocalStorage(): void {
  const libraryLocalStorage = JSON.parse(localStorage.getItem("library")!);

  if (!libraryLocalStorage) {
    bookLibrary = bookLibraryDefault;
  } else {
    bookLibrary = libraryLocalStorage;
  }
}
