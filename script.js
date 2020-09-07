const addBtn = document.querySelector(".app-add-btn__btn");
const card = document.querySelector(".card");
const addToLibrary = document.querySelector(".card-add");
const gallery = document.querySelector(".gallery");

addBtn.addEventListener("click", (ev) => {
	card.classList.toggle("card-hidden");
});

addToLibrary.addEventListener("click", (ev) => {
	ev.preventDefault();
	addNewBook();
	card.reset();
});

function renderBook() {
	let uniqueId = 0;
	myLibrary.forEach((book) => {
		let bookRead = "";
		if (book.read === "true") {
			bookRead = "READ";
		} else {
			bookRead = "NOT READ";
		}
		let text = `
		<div class="gallery-card data-unique-id${uniqueId}">
			<p>${book.title}</p>
			<p>${book.author}</p>
			<p>${book.pages} pages</p>
			<button class="read-it">${bookRead}</button>
			<button data-unique-id${uniqueId}>DELETE</button>
		</div>
	`;
		uniqueId++;
		gallery.insertAdjacentHTML("afterbegin", text);
	});
}

function addNewBook() {
	let title = document.querySelector(".card-title").value;
	let author = document.querySelector(".card-author").value;
	let pages = document.querySelector(".card-pages").value;
	let readCheckbox = document.querySelector("#read");
	let readStatus;
	if (title === "" || author === "") {
		return;
	} else {
		if (readCheckbox.checked) {
			readStatus = "true";
		} else {
			readStatus = "false";
		}

		let newBook = new Book(title, author, pages, readStatus);

		myLibrary.push(newBook);
		gallery.innerHTML = "";
		renderBook();
	}
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

let myLibrary = [
	// { title: "Atomic Habits", author: "James Clear", pages: "222", read: true },
];

Book.prototype.info = function (title, author, pages, read) {
	if (this.read) {
		return `${this.title} was written by ${this.author}, it has ${this.pages} and was read.`;
	} else {
		return `${this.title} was written by ${this.author}, it has ${this.pages} and was not read.`;
	}
};
