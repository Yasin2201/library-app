const form = document.querySelector('#form')
const newBookBtn = document.querySelector('.newBook')
const submitBookBtn = document.querySelector('.submit')
const exitForm = document.querySelector('.exitForm');
const bookDisplay = document.querySelector('#bookDisplay')

let myLibrary = [];

//Book constructor
function Book(title, author, pages, read) {
  this.id = new Date()
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Pushes newBook to library array
function addBookToLibrary() {
  let newBook = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked);
  
  myLibrary.push(newBook)
}

//Displays form when clicking 'New Book' button
newBookBtn.addEventListener("click", function(){
    form.style.display = 'grid'
  });

//Hides 'NewBook' form once completed and displays on screen & pushes to myLibrary
submitBookBtn.addEventListener("click", function(){
  form.style.display = 'none'
  addBookToLibrary()
  displayBook()
  form.reset()
});

//Closes out the form without adding a newBook
exitForm.addEventListener("click", () => {
  form.style.display = 'none'
})

//deletes book and removes from myLibrary array
function deleteBook(card, e) {
  let btnID = e.target.id
  card.remove()

  for (i = 0; i < myLibrary.length; i++) {
    let libID = myLibrary[i].id
    if (btnID == libID) {
      myLibrary.splice(i, 1)
    }
  }
}

//changes wether the user has 'read' or 'not read' the book
function toggleReadStatus(readStatusBtn, e) {
  let btnID = e.target.id

  for (i = 0; i < myLibrary.length; i++) {
    let libID = myLibrary[i].id

    if (btnID == libID && myLibrary[i].read == false) {
      myLibrary[i].read = true
      readStatusBtn.textContent = 'Read'
      readStatusBtn.style.background = 'green'

    } else if ((btnID == libID && myLibrary[i].read == true)) {
      myLibrary[i].read = false
      readStatusBtn.textContent = 'Not Read'
      readStatusBtn.style.background = 'rgb(192, 49, 49)'
    }
    }
}

// display the book and all its contents on screen
function displayBook() {
  const deleteBookBtn = document.createElement('button')
  deleteBookBtn.textContent = 'Delete'
  deleteBookBtn.classList.add('cardDelete')

  const readStatusBtn = document.createElement('button')
  readStatusBtn.textContent = 'Read'
  readStatusBtn.classList.add('cardReadStatus')

  const card = document.createElement('div')

  const titleDiv = document.createElement('div')
  titleDiv.classList.add('cardTitle')
  const authorDiv = document.createElement('div')
  authorDiv.classList.add('cardAuthor')
  const pagesDiv = document.createElement('div')
  pagesDiv.classList.add('cardPages')

  for (i = 0; i < myLibrary.length; i++) {
  deleteBookBtn.id = myLibrary[i].id
  card.id = myLibrary[i].id
  readStatusBtn.id = myLibrary[i].id

  card.classList.add('bookCard')

  titleDiv.textContent = `${myLibrary[i].title}`
  card.appendChild(titleDiv)
  
  authorDiv.textContent = `${myLibrary[i].author}`
  card.appendChild(authorDiv)

  pagesDiv.textContent = `${myLibrary[i].pages} pages`
  card.appendChild(pagesDiv)

  if (myLibrary[i].read == true) {
    readStatusBtn.textContent = 'Read'
    readStatusBtn.style.background = 'green'
  } else {
    readStatusBtn.textContent = 'Not Read'
    readStatusBtn.style.background = 'rgb(192, 49, 49)'
  }
  
  card.appendChild(readStatusBtn)
  card.appendChild(deleteBookBtn)
  bookDisplay.appendChild(card)

  }
  
  readStatusBtn.addEventListener("click", (e) => {
  toggleReadStatus(readStatusBtn, e)
  });
  
  deleteBookBtn.addEventListener("click", (e) => {
  deleteBook(card, e)
  });
}
