const bookDisplay = document.querySelector('#bookDisplay');
const addBook = document.querySelector('.newBook');
const form = document.querySelector('#form');
const submit = document.querySelector('.submit');
const exitForm = document.querySelector('.exitForm');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, Read: ${read}`
  }
}

// function addBookToLibrary() {
//   const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, false);
//   const theKiteRunner = new Book('The Kite Runner', 'Khaled Hosseini', 371, true);
//   const malcolmX = new Book('Malcolm X', 'Autobiography', 300, false);
//   myLibrary.push(theHobbit.info(), theKiteRunner.info(), malcolmX.info())
// }
// addBookToLibrary()

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


addBook.addEventListener("click", () => {
    form.style.display = 'block'
})

submit.addEventListener("click", () => {
  let x = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked);
  myLibrary.push(x.info())
  displayBooks(myLibrary)
})

exitForm.addEventListener("click", () => {
  form.style.display = 'none'
})