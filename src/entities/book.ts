export class Book {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public pages: number,
    public status: boolean,
    public textButtonStatus: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.textButtonStatus = status
      ? (this.textButtonStatus = "Read")
      : (this.textButtonStatus = "Unread");
  }
}
