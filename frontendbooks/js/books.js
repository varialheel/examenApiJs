class Book {
  constructor(id, title, author, category, content, cover, url_download) {
      this._id = id;
      this._title = title;
      this._author = author;
      this._category = category; 
      this._content = content; 
      this._cover = cover; 
      this._url_download=url_download;
  }

  get id() {
      return this._id;
  }
  set id(id) {
      this._id = id;
  }

  get title() {
      return this._title;
  }
  set title(title) {
      this._title = title;
  }

  get author() {
      return this._author;
  }
  set author(author) {
      this._author = author;
  }

  get category() {
      return this._category;
  }
  set category(category) {
      this._category = category;
  }

  get content() {
      return this._content;
  }
  set content(content) {
      this._content = content;
  }

  get cover() {
      return this._cover;
  }
  set cover(cover) {
      this._cover = cover;
  }

  get url_download() {
      return this._url_download;
  }
  set url_download(url_download) {
      this._url_download = url_download;
  }
}

export default Book;