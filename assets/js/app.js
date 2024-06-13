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
	template: `
    <div id="dashboard">
      <div id="dashboard-content">
        <div class="card mb-3 border-rounded">
            <div class="card-body text-center align-middle text-white p-5" id="welcome-card">
            <h2 class="card-title">Welcome to Grimoire</h2>
            <p class="card-text">This is a platform for sharing and discussing your favorite books.</p>
            </div>
        </div>
      </div>
    </div>
    `,
});

Vue.component("authors", {
	template: `
        <div>
           <headings title="Authors"></headings> 

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
                    <textarea class="form-control" id="description" rows="3"></textarea :value="book.description">
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
                        this.$emit("book-edited");
                        this.$emit("toggle");
                        this.clearForm();
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
                    <a href="/grimoire/library" class="btn btn-danger btn-sm">Cancel</a>
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
						this.$emit("book-added");
						// this.$emit("toggle");
						this.clearForm();
                        document.getElementById("error-message").innerHTML = "";
                        window.location.href = "/grimoire/library";
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
	},
});

Vue.component("library", {
	props: [],
	data() {
		return {
			books: [],
		};
	},
	template: `
        <div>
            <headings title="Library"></headings>
            <div id="library-content">
                <a class="btn btn-primary mb-3" href="/grimoire/library/add-book">Add</a>
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
                            <tr v-for="book in books">
                                <td>{{ book.id }}</td>
                                <td>{{ book.title }}</td>
                                <td>{{ book.author }}</td>
                                <td>{{ book.genre }}</td>
                                <td>{{ book.published_year }}</td>
                                <td>{{ book.description }}</td>
                                <td><a :href="'/grimoire/library/edit-book/' + book.id" class="btn btn-primary" >Edit</a></td>
                                <td><a class="btn btn-danger" @click.prevent="deleteBook(book.id)" >Delete</a></td>
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
		displayAddForm() {
			document.getElementById("add-book-form").classList.toggle("d-none");
			document.getElementById("add-book-form").classList.toggle("d-block");

			document.getElementById("library-content").classList.toggle("d-none");
			document.getElementById("library-content").classList.toggle("d-block");
		},
        displayEditForm(id) {
            this.$emit("getBook", id);
            document.getElementById("edit-book-form").classList.toggle("d-none");
            document.getElementById("edit-book-form").classList.toggle("d-block");
            document.getElementById("library-content").classList.toggle("d-none");
            document.getElementById("library-content").classList.toggle("d-block");
        },
	},
	mounted() {
		this.fetchBooks();
	},
});

new Vue({
	el: "#app",
	data: {
		currentProps: {},
		menuItems: [
			{
				label: "Dashboard",
				href: "/grimoire/", 
				icon: "bi bi-house",
				component: "dashboard",
				props: {},
			},
			{
				label: "Authors",
				href: "/grimoire/authors",
				icon: "bi bi-person",
				component: "authors",
				props: {},
			},
			{
				label: "Library",
				href: "/grimoire/library",
				icon: "bi bi-book",
				component: "library",
				props: {},
			},
		],
	},
});
