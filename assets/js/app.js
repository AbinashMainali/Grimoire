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

Vue.component("add-book", {
    template: `
        <div>
            <headings title="Add Book"></headings>
            <div id="add-book-form" class="form-group">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title">
                </div>
                <div class="mb-3">
                    <label for="author" class="form-label">Author</label>
                    <input type="text" class="form-control" id="author">
                </div>
                <div class="mb-3">
                    <label for="genre" class="form-label">Genre</label>
                    <input type="text" class="form-control" id="genre">
                </div>
                <div class="mb-3">
                    <label for="published_year" class="form-label">Published Year</label>
                    <input type="text" class="form-control" id="published_year">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="addBook">Submit</button>
            </div>
        </div>
    `,
    methods: {
        addBook() {
            console.log("add book");
            fetch(BASEURL + "books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: document.getElementById("title").value,
                    author: document.getElementById("author").value,
                    genre: document.getElementById("genre").value,
                    published_year: document.getElementById("published_year").value,
                    description: document.getElementById("description").value,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    this.books = data;
                });
        },
    },
}
)

Vue.component("library", {
	props: ["books"],
	template: `
        <div>
            <headings title="Library"></headings>
            <a href="#add" class="btn btn-primary mb-3">Add</a>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="thead-dark text-center align-middle">
                        <tr>
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
                            <td>{{ book.title }}</td>
                            <td>{{ book.author }}</td>
                            <td>{{ book.genre }}</td>
                            <td>{{ book.published_year }}</td>
                            <td>{{ book.description }}</td>
                            <td><a href="#" class="btn btn-primary">Edit</a></td>
                            <td><a href="#" class="btn btn-danger">Delete</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <add-book></add-book>
        </div>
    `
});

new Vue({
	el: "#app",
	data: {
		currentComponent: "dashboard",
		currentProps: {},
		menuItems: [
			{
				label: "Dashboard",
				href: "/",
				icon: "bi bi-house",
				component: "dashboard",
				props: {},
			},
			{
				label: "Authors",
				href: "/authors",
				icon: "bi bi-person",
				component: "authors",
				props: {},
			},
			{
				label: "Library",
				href: "/books",
				icon: "bi bi-book",
				component: "library",
				props: {},
			},
		],
	},
	methods: {
		navigate(component, props) {
			this.currentComponent = component;
			this.currentProps = props;
		},
		getBooks() {
			fetch(BASEURL + "books")
				.then((response) => response.json())
				.then((data) => {
					this.menuItems.forEach((element) => {
						element.props = { books: data };
					});
				});
		},
	},
	mounted() {
		this.getBooks();
	},
});
