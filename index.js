import BookClass from './bookClass.js';

class Books {
  constructor() {
    this.bookList = document.getElementById('bookList');
    this.bookTitle = document.getElementById('titleInput');
    this.bookAuthor = document.getElementById('authorInput');
    this.form = document.getElementById('form');
    this.booksArray = [];
    if (localStorage.getItem('Nabeel')) {
      this.booksArray = JSON.parse(localStorage.getItem('Nabeel'));
      this.displayBooks();
    }
    this.bookLink = document.getElementById('booksLink');
    this.addBookLink = document.getElementById('addBookLink');
    this.contactLink = document.getElementById('contactLink');
    this.booksSection = document.getElementById('books');
    this.addBookSection = document.getElementById('addBook');
    this.contactSection = document.getElementById('contact');

    this.bookLink.addEventListener('click', () => this.showBooksSection());
    this.addBookLink.addEventListener('click', () => this.showAddBookSection());
    this.contactLink.addEventListener('click', () => this.showContactSection());
  }

  addBook = () => {
    const title = this.bookTitle.value;
    const author = this.bookAuthor.value;
    const book = new BookClass(title, author);
    this.booksArray.push(book);
    this.displayBooks();
    this.saveToLocalStorage();
    this.bookAuthor.value = '';
    this.bookTitle.value = '';
  }

  saveToLocalStorage = () => {
    localStorage.setItem('Nabeel', JSON.stringify(this.booksArray));
  };

  displayBooks = () => {
    this.bookList.innerHTML = '';
    this.booksArray.forEach((book) => {
      const li = document.createElement('li');
      li.innerHTML = `"${book.title}" by ${book.author}`;
      const remBtn = document.createElement('button');
      remBtn.innerHTML = 'Remove';
      remBtn.addEventListener('click', () => this.removeBook(book));
      li.appendChild(remBtn);
      this.bookList.appendChild(li);
    });
  }

  removeBook = (book) => {
    this.booksArray = this.booksArray.filter((a) => a !== book);
    this.saveToLocalStorage();
    this.displayBooks();
  };

  showBooksSection() {
    this.bookLink.classList.add('active');
    this.addBookLink.classList.remove('active');
    this.contactLink.classList.remove('active');
    this.booksSection.classList.add('active');
    this.addBookSection.classList.remove('active');
    this.contactSection.classList.remove('active');
  }

  showAddBookSection() {
    this.bookLink.classList.remove('active');
    this.addBookLink.classList.add('active');
    this.contactLink.classList.remove('active');
    this.booksSection.classList.remove('active');
    this.addBookSection.classList.add('active');
    this.contactSection.classList.remove('active');
  }

  showContactSection() {
    this.bookLink.classList.remove('active');
    this.addBookLink.classList.remove('active');
    this.contactLink.classList.add('active');
    this.booksSection.classList.remove('active');
    this.addBookSection.classList.remove('active');
    this.contactSection.classList.add('active');
  }
}

const books = new Books();
const form = document.getElementById('form');
form.addEventListener('submit', () => {
  books.addBook();
});

const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'August', 'October', 'November', 'December'];
function getDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  if (month.toString().length === 1) {
    month = `0${month}`;
  }
  if (day.toString().length === 1) {
    day = `0${day}`;
  }
  if (hour.toString().length === 1) {
    hour = `0${hour}`;
  }
  if (minute.toString().length === 1) {
    minute = `0${minute}`;
  }
  if (second.toString().length === 1) {
    second = `0${second}`;
  }
  const dateTime = `${day} ${monthsList[month - 1]}, ${year} ${hour}:${minute}:${second}`;
  return dateTime;
}

const dateTime = document.getElementById('dateTime');
setInterval(() => {
  const currentTime = getDateTime();
  dateTime.innerHTML = currentTime;
}, 1000);