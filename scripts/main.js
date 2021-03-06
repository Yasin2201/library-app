const form = document.querySelector('#form')
const newBookBtn = document.querySelector('.newBook')
const submitBookBtn = document.querySelector('.submit')
const exitForm = document.querySelector('.exitForm');
const bookDisplay = document.querySelector('#bookDisplay')

let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = new Date()
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
    let newBook = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked);
    myLibrary.push(newBook)
}

function displayBook() {
    const deleteBookBtn = document.createElement('button')
    deleteBookBtn.textContent = 'Delete Book'

    const card = document.createElement('div')
    card.style.border = ('solid 2px black')
    card.style.width = ('200px')
    card.style.margin = ('3px')

    bookDisplay.appendChild(card)
    card.appendChild(deleteBookBtn)

    const titleDiv = document.createElement('div')
    const authorDiv = document.createElement('div')
    const pagesDiv = document.createElement('div')
    const readDiv = document.createElement('div')


    for (i = 0; i < myLibrary.length; i++) {
    deleteBookBtn.id = myLibrary[i].id
    card.id = myLibrary[i].id

    card.classList.add('bookCard')

    titleDiv.textContent = `${myLibrary[i].title}`
    card.appendChild(titleDiv)
    
    authorDiv.textContent = `${myLibrary[i].author}`
    card.appendChild(authorDiv)

    pagesDiv.textContent = `${myLibrary[i].pages} pages`
    card.appendChild(pagesDiv)

    readDiv.textContent = `Read: ${myLibrary[i].read}`
    card.appendChild(readDiv)
    }

    deleteBookBtn.addEventListener("click", (e) => {
    let btnID = e.target.id
    card.remove()

    for (i = 0; i < myLibrary.length; i++) {
      let libID = myLibrary[i].id
      if (btnID == libID) {
        myLibrary.splice(i, 1)
      }
    }
    });
  }


newBookBtn.addEventListener("click", function(){
    form.style.display = 'block'
  });

submitBookBtn.addEventListener("click", function(){
addBookToLibrary()
  displayBook()
});

exitForm.addEventListener("click", () => {
  form.style.display = 'none'
})