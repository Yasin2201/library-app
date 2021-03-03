const bookDisplay = document.querySelector('#bookDisplay');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, Read: ${read}`
  }
}

function addBookToLibrary() {
  const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
  const theKiteRunner = new Book('The Kite Runner', 'Khaled Hosseini', 371, true);
  const runn = new Book('run', 'run', 371, true);
  myLibrary.push(theHobbit.info(), theKiteRunner.info(), runn.info())
}
addBookToLibrary()

function displayBooks(myLibrary) {
        for (let i = 0; i < myLibrary.length; i++) {
        let bookDiv = document.createElement('div')
        bookDiv.classList.add(i + 'bookDiv')
        bookDiv.style.width = "250px";
        bookDiv.style.height =  "50px";
        bookDiv.style.backgroundColor = "white";
        bookDiv.style.border = 'solid 1px black'
        bookDiv.style.margin = '4px'
        bookDisplay.appendChild(bookDiv)
        bookDiv.textContent = myLibrary[i]
    }
}

displayBooks(myLibrary)
