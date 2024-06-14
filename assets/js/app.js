Vue.config.devtools = true;
Vue.config.productionTip = false;
const BASEURL = "http://localhost/grimoire/";

/**
 * Retrieves the data from a form with the specified ID.
 *
 * @param {string} formId - The ID of the form to retrieve data from.
 * @return {Object} An object containing the data from the form inputs, where the keys are the input IDs and the values are the input values.
 */
const getFormData = (formId) => {
	const form = document.getElementById(formId);
	const inputs = form.querySelectorAll("input, textarea");
	const data = {};
	inputs.forEach((input) => {
		data[input.id] = input.value;
	});
	return data;
};

/**
 * Validates a form by checking if all input fields have a value, except for the fifth input field i.e discription.
 *
 * @param {string} formId - The ID of the form to validate.
 * @return {boolean} Returns true if all input fields have a value, except for the fifth input field. Otherwise, returns false.
 */
const validateForm = (formId) => {
	const form = document.getElementById(formId);
	const inputs = form.querySelectorAll("input, textarea");
	let isValid = true;
	inputs.forEach((input, index) => {
		if (index === 5 && input.value === ""){
			return;
		}
		if(index === 5 && input.value.length < 100) isValid = false;
		if (input.value === "") isValid = false;
	});
	return isValid;
};

// Heading Component
Vue.component("headings", {
	props: ["title"],
	template: `
        <div>
            <h1 class="text-emphasis">{{ title }}</h1>
            <hr>
        </div>
    `,
});

// Dashboard Component
Vue.component("dashboard", {
	data() {
		return {
			// Adding dummy data in dashboard to make it look nicer.
			books: [
				{
					id: 1,
					title: "The Hobbit",
					author: "J.R.R. Tolkien",
					genre: "Fantasy",
					published_year: "1937",
					images: "../grimoire/assets/images/hobbit.jpg",
				},
				{
					id: 2,
					title: "The Fellowship of the Ring",
					author: "J.R.R. Tolkien",
					genre: "Fantasy",
					published_year: "1954",
					images: "../grimoire/assets/images/fellow.jpg",
				},
				{
					id: 3,
					title: "The Two Towers",
					author: "J.R.R. Tolkien",
					genre: "Fantasy",
					published_year: "1954",
					images: "../grimoire/assets/images/twotowers.jpg",
				},
				{
					id: 4,
					title: "The Return of the King",
					author: "J.R.R. Tolkien",
					genre: "Fantasy",
					published_year: "1955",
					images: "../grimoire/assets/images/king.jpg",
				},
			],
		};
	},
	template: `
    <div id="dashboard">
      <div id="dashboard-content">
        <div class="card mb-3 border-rounded">
            <div class="card-body text-center align-middle text-white p-5" id="welcome-card">
            <h2 class="card-title">Welcome to Grimoire</h2>
            <p class="card-text">This is a platform for sharing and discussing your favorite mythical books.</p>
            </div>
        </div>
      </div>
      <div id="dashboard-menu" class="container">
        <h2 class="display-4 text-emphasis mb-4">Popular Books</h2>
        <hr class="my-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-10 mb-3">
          <div class="col" v-for="book in books" :key="book.id">
            <div class="card border-0 h-100">
              <img class="img rounded img-fluid" :src="book.images" alt="Card image cap">
              <div class="card-body p-3">
                <h5 class="card-title text-emphasis display-10">{{ book.title }}</h5>
                <p class="card-text">Author: {{ book.author }}</p>
                <p class="card-text text-muted">Published Year: {{ book.published_year }}</p>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </div>
    `,
});

// Edit Book Component
Vue.component("edit-book", {
	data() {
		return {
			book: [],
		};
	},
	template: `
        <div id="edit-book">
        <headings title="Edit Book"></headings>
            <div id="edit-book-form" class="form-group">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" required :value="book.title">
                </div>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="first_name" required :value="book.author && book.author.split(' ')[0]">
                </div>
				<div class="mb-3">
					<label for="last_name" class="form-label">Last Name</label>
					<input type="text" class="form-control" id="last_name" required :value="book.author && book.author.split(' ')[1]">
				</div>
                <div class="mb-3">
                    <label for="genre" class="form-label">Genre</label>
                    <input type="text" class="form-control" id="genre" required :value="book.genre">
                </div>
                <div class="mb-3">
                    <label for="published_year" class="form-label">Published Year</label>
                    <input type="number" class="form-control" id="published_year" required :value="book.published_year">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" :value="book.description" minlength="100" placeholder="Description must be at least 100 characters long or Empty."></textarea>
                </div>
                 <div class="d-flex justify-content-start gap-3 align-items-center mb-3">
                    <button type="submit" class="btn btn-success btn-sm" @click.prevent="editBook">Submit</button>
                    <button type="submit" class="btn btn-warning btn-sm" @click.prevent="clearForm">Clear</button>
                    <a href="/grimoire/library" class="btn btn-danger btn-sm">Cancel</a>
                </div>
                <div id="error-message" class="text-danger mt-3 text-small" ></div>
            </div>
        </div>
    `,
	methods: {
		/**
		 * Retrieves a book from the server based on the book's ID in the current URL path.
		 *
		 * @return {Promise<void>} - A promise that resolves when the book data is successfully fetched and stored in the component's state.
		 */
		getBook() {
			const id = location.pathname.split("/").pop();
			fetch(BASEURL + "books/" + id)
				.then((res) => res.json())
				.then((data) => {
					this.book = data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		/**
		 * Edits a book by sending a PUT request to the server with the updated book data.
		 *
		 * @return {Promise<void>} - A promise that resolves when the book is successfully edited and the form is cleared.
		 *                          If the form validation fails, an error message is displayed.
		 */
		editBook() {
			const bookData = getFormData("edit-book-form");
			if (!validateForm("edit-book-form")) {
				document.getElementById("error-message").innerHTML =
					"Please fill in all fields with valid data!";
				return;
			}
			fetch(BASEURL + "books/" + this.book.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bookData),
			})
				.then((res) => res.json())
				.then(({ status, message }) => {
					if (status === "success") {
						this.clearForm();
						this.goBack();
					} else {
						document.getElementById("error-message").innerHTML = Object.values(message)[0];
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		clearForm() {
			const form = document.getElementById("edit-book-form");
			const inputs = form.querySelectorAll("input, textarea");
			inputs.forEach((input) => (input.value = ""));
			document.getElementById("error-message").innerHTML = "";
		},

		goBack() {
			window.history.back();
		},
	},

	mounted() {
		this.getBook();
	},
});

Vue.component("add-book", {
	template: `
        <div id="add-book">
            <headings title="Add Book"></headings>
            <div id="add-book-form" class="form-group">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" required>
                </div>
                <div class="mb-3">
                    <label for="first_name" class="form-label">First Name</label>
                    <input type="text" class="form-control" id="first_name" required>
                </div>
				<div class="mb-3">
					<label for="last_name" class="form-label">Last Name</label>
					<input type="text" class="form-control" id="last_name" required>
				</div>
                <div class="mb-3">
                    <label for="genre" class="form-label">Genre</label>
                    <input type="text" class="form-control" id="genre" required>
                </div>
                <div class="mb-3">
                    <label for="published_year" class="form-label">Published Year</label>
                    <input type="number" class="form-control" id="published_year" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" minlength="100" placeholder="Description must be at least 100 characters long or Empty."></textarea>
                </div>
                <div class="d-flex justify-content-start gap-3 align-items-center mb-3">
                    <button type="submit" class="btn btn-success btn-sm" @click.prevent="addBook">Submit</button>
                    <button type="submit" class="btn btn-warning btn-sm" @click.prevent="clearForm">Clear</button>
                    <button type="button" class="btn btn-danger btn-sm" @click="goBack">Cancel</button>
                </div>
                <div id="error-message" class="text-danger mt-3 text-small" ></div>
            </div>
        </div>
    `,
	methods: {
		addBook() {
			const bookData = getFormData("add-book-form");
			if (!validateForm("add-book-form")) {
				document.getElementById("error-message").innerHTML =
					"Please fill in all fields with valid data!";
				return;
			}
			fetch(BASEURL + "books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(bookData),
			})
				.then((res) => res.json())
				.then(({ status, message }) => {
					if (status === "success") {
						this.clearForm();
						document.getElementById("error-message").innerHTML = "";
						this.goBack();
					} else {
						document.getElementById("error-message").innerHTML = Object.values(message)[0];
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		clearForm() {
			const form = document.getElementById("add-book-form");
			const inputs = form.querySelectorAll("input, textarea");
			inputs.forEach((input) => (input.value = ""));
			document.getElementById("error-message").innerHTML = "";
		},

		goBack() {
			window.history.back();
		},
	},
});

// Library Component
Vue.component("library", {
	props: [],
	data() {
		return {
			books: [],
			showArchived: true,
		};
	},
	template: `
        <div>
            <headings title="Library"></headings>
            <div id="library-content">
                <div class="m-3">
                    <a class="btn btn-primary btn-sm" href="/grimoire/library/add-book"><i class="bi bi-plus-lg"></i> Add</a>
                    <button type="button" class="btn btn-danger btn-sm" @click="toggleArchive" style="float: right;"><i class="bi bi-book"></i> Show Archived</button>
                </div>
                <div class="table-responsive mt-3">
                    <table class="table table-striped table-hover">
                        <thead class="thead text-center align-middle">
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Published Year</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="book in books.filter(book => !showArchived || !book.deleted_at)" :key="book.id" :class="book.deleted_at ? 'table-danger' : ''">
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.genre }}</td>
                                <td>{{ book.published_year }}</td>
                                <td>{{ book.description }}</td>
                                <td>
                                    <a :href="'/grimoire/library/edit-book/' + book.id" :class="book.deleted_at ? 'd-none' : ''" class="btn btn-primary btn-sm " ><i class="bi bi-pencil"></i></a>
                                    <a class="btn btn-danger btn-sm mx-1 my-1" :class="book.deleted_at ? 'd-none' : ''" @click.prevent="deleteBook(book.id)"><i class="bi bi-trash"></i></a>
                                </td>
                            </tr>
                            <tr v-if="books.length === 0">
                                <td colspan="7" class="text-center">No books found</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
	methods: {
		/**
		 * Deletes a book with the specified ID from the server.
		 *
		 * @param {number} id - The ID of the book to delete.
		 * @return {Promise<void>} A promise that resolves when the book is successfully deleted.
		 */
		deleteBook(id) {
			fetch(BASEURL + "books/" + id, {
				method: "DELETE",
			})
				.then((response) => response.json())
				.then((data) => {
					this.fetchBooks();
					console.log("Deleted successfully", data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		/**
		 * Fetches books from the server.
		 *
		 * @return {Promise<void>} A promise that resolves when the books are successfully fetched.
		 */
		fetchBooks() {
			fetch(BASEURL + "books")
				.then((response) => response.json())
				.then((data) => {
					this.books = data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		toggleArchive() {
			this.showArchived = !this.showArchived;
		},
	},
	mounted() {
		this.fetchBooks();
	},
});

// Vue Instance Initialization
new Vue({
	el: "#app",
	data: {
		menuItems: [
			{
				label: "Dashboard",
				href: "/grimoire/",
				icon: "bi bi-house",
			},
			{
				label: "Library",
				href: "/grimoire/library",
				icon: "bi bi-book",
			},
		],
	},
});
