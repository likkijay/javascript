const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');
const toasts = document.querySelector('.toasts');


class Book {
  static createBook() {
    const title = bookForm['title'].value.trim(),
          author = bookForm['author'].value.trim(),
          isbn = bookForm['isbn'].value.trim();

    // check for proper ISBN length (10 or 13 digits)
    if (!(isbn.length < 10)) {
      // new book obj created from form submitted values
      const newBook = {
        title,
        author,
        isbn
      };

      // get saved books from localstorage
      const books = Storage.getBooks();

      // check if newBook is already in the localstorage
      const inStore = books.some(book => book.isbn === newBook.isbn);

      if (inStore) {
        // newBook is already in localstorage
        UI.alert('This book is already in the store, please check again the ISBN', 'message');
      } else {
        // save book both to localstorage and UI
        Storage.saveBook(newBook);
        UI.addBookToList(newBook);
        bookForm.reset();
        UI.alert('Book successfully added', 'success');
      }
    } else {
      UI.alert('Please enter valid ISBN (10 or 13 digits)', 'warn');
    }
  }
}

class UI {
  static displayBooks() {

    // get books from localstorage
    const books = Storage.getBooks();

    // display every (if present) book in the UI
    if (books.length) books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // create table row
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger delete">x</a></td>
    `;

    // append table row to booklist
    bookList.insertAdjacentElement('beforeend', row);
  }

  static alert(message, className) {
    // custom toast messages
    const toast = `
      <li class="${className}">${message}</li>
    `;
    toasts.innerHTML += toast;
  }
}

class Storage {
  // get books from localstorage
  static getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  // save new book to localstorage
  static saveBook(book) {
    const books = Storage.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  // remove book from localstorage
  static removeBook(isbn) {
    let books = Storage.getBooks();
    books = books.filter(book => !(book.isbn === isbn));
    localStorage.setItem('books', JSON.stringify(books));
  }
}

// initial displaying of the books if they're in the localstorage
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// submit event handling for form
bookForm.addEventListener('submit', event => {
  event.preventDefault();

  Book.createBook();
});

// delete event handling (remove book from UI and localstorage)
bookList.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.parentElement.remove();
    Storage.removeBook(event.target.parentElement.previousElementSibling.innerText);
    UI.alert('Book successfully removed', 'removed');
  }
});

// delete event handling (for every toast that finished it's animation)
toasts.addEventListener('animationend', event => {
  if (event.animationName === 'hide') {
    return toasts.removeChild(event.target);
  }
});