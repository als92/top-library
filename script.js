const addBtn = document.querySelector(".app-add-btn");
const card = document.querySelector(".card");
const addToLibrary = document.querySelector(".card-add");
const gallery = document.querySelector(".gallery");

let myLibrary = [
	{ title: "Atomic Habits", author: "James Clear", pages: 320, read: true },
	{ title: "Factotum", author: "Charles Bukowski", pages: 288, read: false },
];

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
 				<button data-read>${readStatus}</button>
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
			<button data-read>${readStatus}</button>
			<button data-index=${index} data-delete>DELETE</button>
		</div>
	`;

	gallery.insertAdjacentHTML("beforeend", text);

	myLibrary.push(new Book(title, author, pages, read));
}

// Event listener to show Book form
addBtn.addEventListener("click", () => {
	card.classList.toggle("card-hidden");
});

// Event Listener to add book to library
addToLibrary.addEventListener("click", (e) => {
	e.preventDefault();
	addNewBook(e);
	card.reset();
});

// Event Listener which deletes books
gallery.addEventListener("click", (e) => {
	if (e.target.dataset.hasOwnProperty("delete")) {
		myLibrary.splice(e.target.dataset.index, 1);
		e.target.parentElement.remove();
	}
});

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

displayBooks(myLibrary);
