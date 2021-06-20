const form = document.querySelector('#form')
const newBookBtn = document.querySelector('.newBook')
const submitBookBtn = document.querySelector('.submit')
const exitForm = document.querySelector('.exitForm');
const bookDisplay = document.querySelector('#bookDisplay')

const db = firebase.firestore()

function renderBooks() {
  db.collection('books').get().then((book) => {
    book.forEach((bk) => {
      console.log(book.docs)
      console.log(bk.data())
      displayBook(bk)

    })
  })
}
renderBooks()

function saveBook(book) {
  // Add a new book entry to the database.
  return db.collection('books').add({
    title: book.title,
    author: book.author,
    pages: book.pages,
    read: book.read,
  }).catch(function (error) {
    console.error('Error adding book', error);
  });
}

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

  return saveBook(newBook)
}

//Displays form when clicking 'New Book' button
newBookBtn.addEventListener("click", function () {
  form.style.display = 'grid'
});

//Hides 'NewBook' form once completed and displays on screen & pushes to myLibrary
submitBookBtn.addEventListener("click", function () {
  validateForm()

  if (form.checkValidity() === true) {
    form.style.display = 'none'
    addBookToLibrary()
    // displayBook()
    // renderBooks()
    // db.collection('books').get().then((book) => {
    //   book.forEach((bk) => {
    //     console.log(bk.id)
    //   })
    // })
    form.reset()
  }

});

// Validity styling
function validateForm() {
  if (form.title.validity.valueMissing) {
    form.title.style.backgroundColor = 'rgb(255, 125, 125)'
  } else {
    form.title.style.backgroundColor = 'whitesmoke'
  }

  if (form.author.validity.valueMissing) {
    form.author.style.backgroundColor = 'rgb(255, 125, 125)'
  } else {
    form.author.style.backgroundColor = 'whitesmoke'
  }

  if (form.pages.validity.valueMissing) {
    form.pages.style.backgroundColor = 'rgb(255, 125, 125)'
  } else {
    form.pages.style.backgroundColor = 'whitesmoke'
  }
}

//Closes out the form without adding a newBook
exitForm.addEventListener("click", () => {
  form.style.display = 'none'
})

//deletes book and removes from firestore array
function deleteBook(card, e) {
  let btnID = e.target.id
  db.collection("books").doc(btnID).delete().then(() => {
    console.log("Document successfully deleted!");
    card.remove()
  }).catch((error) => {
    console.error("Error removing document: ", error);
  });
}

//changes if the user has 'read' or 'not read' the book
function toggleReadStatus(readStatusBtn, e) {
  let btnID = e.target.id

  db.collection("books").doc(btnID).get().then((book) => {
    if (book.data().read === true) {
      db.collection("books").doc(btnID).update({ read: false })
      readStatusBtn.textContent = 'Not Read'
      readStatusBtn.style.background = '#FF8B47'
    } else {
      db.collection("books").doc(btnID).update({ read: true })
      readStatusBtn.textContent = 'Read'
      readStatusBtn.style.background = '#27BEBF'
    }
  })
}

// display the book and all its contents on screen
function displayBook(doc) {
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

  // db.collection('books').get().then((snapshot) => {
  //   snapshot.docs.map((doc) => {
  // return doc.data()
  deleteBookBtn.id = doc.id
  card.id = doc.id
  readStatusBtn.id = doc.id

  card.classList.add('bookCard')

  titleDiv.textContent = `${doc.data().title}`
  card.appendChild(titleDiv)

  authorDiv.textContent = `${doc.data().author}`
  card.appendChild(authorDiv)

  pagesDiv.textContent = `${doc.data().pages} pages`
  card.appendChild(pagesDiv)

  if (doc.data().read == true) {
    readStatusBtn.textContent = 'Read'
    readStatusBtn.style.background = '#27BEBF'
  } else {
    readStatusBtn.textContent = 'Not Read'
    readStatusBtn.style.background = '#FF8B47'
  }

  card.appendChild(readStatusBtn)
  card.appendChild(deleteBookBtn)
  bookDisplay.appendChild(card)

  //   })
  // })

  readStatusBtn.addEventListener("click", (e) => {
    toggleReadStatus(readStatusBtn, e)
  });

  deleteBookBtn.addEventListener("click", (e) => {
    deleteBook(card, e)
  });
}
