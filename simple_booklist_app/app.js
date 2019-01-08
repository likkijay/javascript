const bookList = document.getElementById('book-list');
const bookForm = document.getElementById('book-form');


class Book {
  static createBook() {
    const title = bookForm['title'].value.trim();
    const author = bookForm['author'].value.trim();
    const isbn = bookForm['isbn'].value.trim();

    if (!(isbn.length < 10)) {
      const newBook = {
        title,
        author,
        isbn
      };

      const books = Storage.getBooks();

      if (books.length) {
        const inStore = books.some(book => book.isbn === newBook.isbn);

        if (!inStore) {
          Storage.saveBook(newBook);
          UI.addBookToList(newBook);
          bookForm.reset();
          UI.alert('Book successfully added', 'success');
        }
      } else {
        Storage.saveBook(newBook);
        UI.addBookToList(newBook);
        bookForm.reset();
        UI.alert('Book successfully added', 'success');
      }
    } else {
      UI.alert('Please enter valid ISBN (10 or 13 digits)', 'danger');
    }
  }
}

class UI {
  static displayBooks() {

    const books = Storage.getBooks();

    if (books.length) books.forEach(book => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger delete">x</a></td>
    `;

    bookList.insertAdjacentElement('beforeend', row);
  }

  static alert(message, className) {
    const alert = document.createElement('div');
    alert.innerText = message;
    alert.classList = `p-4 badge-${className} custom-alert`;
    document.body.insertAdjacentElement('afterBegin', alert);
    setTimeout(() => alert.remove(), 5000);
  }
}

class Storage {
  static getBooks() {
    return JSON.parse(localStorage.getItem('books')) || [];
  }

  static saveBook(book) {
    const books = Storage.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    let books = Storage.getBooks();
    books = books.filter(book => !(book.isbn === isbn));
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

bookForm.addEventListener('submit', event => {
  event.preventDefault();

  Book.createBook();
});

bookList.addEventListener('click', event => {
  if (event.target.classList.contains('delete')) {
    event.target.parentElement.parentElement.remove();
    Storage.removeBook(event.target.parentElement.previousElementSibling.innerText);
    UI.alert('Book successfully removed', 'success');
  }
});