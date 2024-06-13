Vue.config.devtools = true
Vue.config.productionTip = false

Vue.component('dashboard', {
    template: `
        <div>
            <h1>Dashboard</h1>
        </div>
    `
})

Vue.component('authors', {
    template: `
        <div>
            <h1>Authors</h1>
        </div>
    `
})

Vue.component('library', {
    props: ['books'],
    template: `
        <div class="container p-3 m-3">
            <h1>Books</h1>
            <a href="#" class="btn btn-primary mb-3">Add</a>
            <table class="table table-striped">
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
    `
})

new Vue({
    el: '#app',
    data: {
        currentComponent: 'dashboard',
        props: {},
        menuItems: [
            {label: 'Dashboard', href: '/', icon: 'bi bi-house', component: 'dashboard', props: {}} ,
            {label: 'Authors', href: '/authors', icon: 'bi bi-person', component: 'authors', props: {authors: []}},
            {label: 'Library', href: '/books', icon: 'bi bi-book', component: 'library', props: {books: []}},
        ],
        books: [],
        authors: [],
    },
    methods: {
        navigate(component, props) {
            this.currentComponent = component
        },
    }
})