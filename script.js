const addBtn = document.querySelector(".app-add-btn");
const card = document.querySelector(".card");
const addToLibrary = document.querySelector(".card-add");
const gallery = document.querySelector(".gallery");

let myLibrary = JSON.parse(localStorage.getItem("books")) || [];

// displays books which are stored in array
function displayBooks(arr) {
	arr.map((book, index) => {
		let readStatus = "";
		if (book.read) {
			readStatus = "READ";
		} else {
			readStatus = "NOT READ";
		}
		let text = `
			<div class="gallery-card">
	 			<p>${book.title}</p>
 				<p>${book.author}</p>
 				<p>${book.pages} pages</p>
 				<button data-read data-index=${index}>${readStatus}</button>
 				<button data-index=${index} data-delete>DELETE</button>
 			</div>
		`;

		gallery.insertAdjacentHTML("beforeend", text);
	});
}

// when form is completed, this func is added to array and being displayed
function addNewBook(e) {
	let title = e.target.parentElement[0].value;
	let author = e.target.parentElement[1].value;
	let pages = e.target.parentElement[2].value;
	let read = e.target.parentElement[3].checked;

	let readStatus = "";
	if (read) {
		readStatus = "READ";
	} else {
		readStatus = "NOT READ";
	}
	let index = myLibrary.length;
	let text = `
		<div class="gallery-card">
			<p>${title}</p>
			<p>${author}</p>
			<p>${pages} pages</p>
			<button data-read data-index=${index}>${readStatus}</button>
			<button data-index=${index} data-delete>DELETE</button>
		</div>
	`;

	gallery.insertAdjacentHTML("beforeend", text);
	myLibrary.push(new Book(title, author, pages, read));
	localStorage.setItem("books", JSON.stringify(myLibrary));
}

function updateReadStatus(e) {
	if (e.target.dataset.hasOwnProperty("read")) {
		let idx = e.target.dataset.index;
		let [card] = myLibrary.splice(idx, 1);
		if (card.read) {
			e.target.innerText = "NOT READ";
			card.read = false;
		} else {
			e.target.innerText = "READ";
			card.read = true;
		}
		myLibrary.splice(idx, 1, card);
		localStorage.setItem("books", JSON.stringify(myLibrary));
	}
}

// get users form and add book to library
function addBookToLibrary(e) {
	e.preventDefault();
	addNewBook(e);
	card.reset();
}

// remove book from the library user has selected
function deleteBook(e) {
	if (e.target.dataset.hasOwnProperty("delete")) {
		myLibrary.splice(e.target.dataset.index, 1);
		e.target.parentElement.remove();
		localStorage.setItem("books", JSON.stringify(myLibrary));
	}
}

//update book's read status
gallery.addEventListener("click", updateReadStatus);

// Event listener which shows book form to user
addBtn.addEventListener("click", () => {
	card.classList.toggle("card-hidden");
});

// Event Listener which adds book to library
addToLibrary.addEventListener("click", addBookToLibrary);

// Event Listener which deletes books
gallery.addEventListener("click", deleteBook);

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

displayBooks(myLibrary);
