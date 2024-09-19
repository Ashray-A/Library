const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Toggle the read status of a book
Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

// Add a new book to the library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    renderBooks();  // Update the book display
}

// Remove a book from the library
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);  // Remove book by index
    renderBooks();  // Update the book display
}

// Display books on the page
function renderBooks() {
    const bookContainer = document.getElementById('book-container');
    bookContainer.innerHTML = '';  // Clear the display

    // Loop through each book in the array and display it
    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? "Read" : "Not Read"}</p>
            <button class="toggle-read-btn" data-index="${index}">Toggle Read</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        bookContainer.appendChild(bookCard);
    });

    // Attach event listeners for the 'Toggle Read' and 'Remove' buttons
    document.querySelectorAll('.toggle-read-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();  // Toggle read status
            renderBooks();  // Re-render books
        });
    });

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeBookFromLibrary(index);  // Remove book
        });
    });
}

// Handle form submission
const bookForm = document.getElementById('book-form');
bookForm.addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting

    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    // Add the new book to the library
    addBookToLibrary(title, author, pages, read);

    // Reset the form and hide it
    bookForm.reset();
    document.getElementById('book-form-container').classList.add('hidden');
});

// Toggle form visibility when clicking the "NEW BOOK" button
document.getElementById('new-book-btn').addEventListener('click', () => {
    document.getElementById('book-form-container').classList.remove('hidden');
});

// Close the form modal
document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('book-form-container').classList.add('hidden');
});

