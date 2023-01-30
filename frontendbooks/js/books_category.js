class BooksCategory {
  constructor(book, category) {
      this._book = book;
      this._category = category;
  }

  get book() {
      return this._book;
  }
  set book(book) {
      this._book = book;
  }

  get category() {
      return this._category;
  }
  set category(category) {
      this._category = category;
  }
}

export default BooksCategory;