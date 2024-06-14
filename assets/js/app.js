Vue.config.devtools = true;
Vue.config.productionTip = false;
const BASEURL = "http://localhost/grimoire/";

Vue.component("headings", {
	props: ["title"],
	template: `
        <div>
            <h1 class="text-emphasis">{{ title }}</h1>
        </div>
    `,
});

Vue.component("dashboard", {
	data() {
		return {
			// Adding Demo data in dashboard to make it look nicer.
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
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" required :value="book.author">
                </div>
                <div class="mb-3">
                    <label for="genre" class="form-label">Genre</label>
                    <input type="text" class="form-control" id="genre" required :value="book.genre">
                </div>
                <div class="mb-3">
                    <label for="published_year" class="form-label">Published Year</label>
                    <input type="text" class="form-control" id="published_year" required :value="book.published_year">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3" :value="book.description"></textarea>
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
		editBook() {
			const book = {
				title: document.getElementById("title").value,
				author: document.getElementById("author").value,
				genre: document.getElementById("genre").value,
				published_year: document.getElementById("published_year").value,
				description: document.getElementById("description").value,
			};
			fetch(BASEURL + "books/" + this.book.id, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(book),
			})
				.then((res) => res.json())
				.then(({ status, message }) => {
					if (status === "success") {
						this.clearForm();
						this.goBack();
					} else {
						document.getElementById("error-message").innerHTML = message;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		clearForm() {
			const fields = document.querySelectorAll(
				"#edit-book-form input, #edit-book-form textarea"
			);
			fields.forEach((field) => (field.value = ""));
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
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author" required>
                </div>
                <div class="mb-3">
                    <label for="genre" class="form-label">Genre</label>
                    <input type="text" class="form-control" id="genre" required>
                </div>
                <div class="mb-3">
                    <label for="published_year" class="form-label">Published Year</label>
                    <input type="text" class="form-control" id="published_year" required>
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3"></textarea>
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
			const book = {
				title: document.getElementById("title").value,
				author: document.getElementById("author").value,
				genre: document.getElementById("genre").value,
				published_year: document.getElementById("published_year").value,
				description: document.getElementById("description").value,
			};

			fetch(BASEURL + "books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(book),
			})
				.then((res) => res.json())
				.then(({ status, message }) => {
					if (status === "success") {
						this.clearForm();
						document.getElementById("error-message").innerHTML = "";
						this.goBack();
					} else {
						document.getElementById("error-message").innerHTML = message;
					}
				})
				.catch((error) => {
					console.log(error);
				});
		},
		clearForm() {
			const fields = document.querySelectorAll(
				"#add-book-form input, #add-book-form textarea"
			);
			fields.forEach((field) => (field.value = ""));
		},
		goBack() {
			window.history.back();
		},
	},
});

Vue.component("library", {
	props: [],
	data() {
		return {
			books: [],
			showArchived: false,
		};
	},
	template: `
        <div>
            <headings title="Library"></headings>
            <div id="library-content">
                <div class="mb-3">
                    <a class="btn btn-primary btn-sm" href="/grimoire/library/add-book"><i class="bi bi-plus-lg"></i> Add</a>
                    <button type="button" class="btn btn-danger btn-sm" @click="toggleArchive" style="float: right;"><i class="bi bi-book"></i> Show Archived</button>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-hover">
                        <thead class="thead-dark text-center align-middle">
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Published Year</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="book in books.filter(book => !showArchived || !book.deleted_at)" :key="book.id" :class="book.deleted_at ? 'table-danger' : ''">
                                <td>{{ book.id }}</td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.genre }}</td>
                                <td>{{ book.published_year }}</td>
                                <td>{{ book.description }}</td>
                                <td><a :href="'/grimoire/library/edit-book/' + book.id" class="btn btn-primary btn-sm" ><i class="bi bi-pencil"></i></a></td>
                                <td><a class="btn btn-danger btn-sm" @click.prevent="deleteBook(book.id)"><i class="bi bi-trash"></i></a></td>
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
